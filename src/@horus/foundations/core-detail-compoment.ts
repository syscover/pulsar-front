import { Injector, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { CoreComponent } from './core-component';
import { Lang } from '../../apps/admin/admin.models';
import { ValidationMessageService } from '@horus/services/validation-message.service';
import '@horus/functions/string-capitalize.function';
import * as _ from 'lodash';

export abstract class CoreDetailComponent extends CoreComponent implements OnInit
{
    formErrors: any = {};
    fg: FormGroup;
    fb: FormBuilder;
    lang: Lang; // Current lang for objects that has multiple language
    object: any = {}; // set empty object
    validationMessageService: ValidationMessageService;
    
    protected constructor(
        protected injector: Injector,
        public graphQL: any
    ) 
    {
        super(injector, graphQL);
        this.fb = injector.get(FormBuilder);
        this.validationMessageService = injector.get(ValidationMessageService);

        // create form, this method will be overwrite by child class
        this.createForm();
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        this.validationMessageService.subscribeForm(this.fg, this.formErrors);
        this.init();
    }

    // Function that can to be overwrite in child class
    setData(response?): void
    {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') 
        {
            this.object = response; // function to set custom data

            this.beforePatchValueEdit();

            this.fg.patchValue(this.object); // set values of form

            this.afterPatchValueEdit();

            // only form objects with create lang action
            if (this.dataRoute.action === 'create-lang') 
            {
                this.fg.patchValue({
                    // set lang id in form from object with multiple language
                    lang_id: this.lang.id
                });
            }
        }

        this.showSpinner = false;

        // routine to check if we have to disable form
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang')
        {
            if (this.dataRoute.action === 'create-lang')
            {
                // disabled inputs that hasn't contain multi language
                this.disableForm();
            }
            else if (this.dataRoute.action === 'edit')
            {
                // disabled elements if edit different language that base lang
                if (this.lang && this.lang.id !== this.baseLang) this.disableForm();
            }
        }

        this.afterSetData();
    }

    // method to implement actions befere patch value in edit action
    beforePatchValueEdit(): void {}

    // method to implement actions after set data action
    afterPatchValueEdit(): void {}

    // method to disable fields in detail component multi languages
    disableForm(): void {}

    // method to implement actions after patch value in edit action
    afterSetData(): void {}

    // method that will be overwrite
    createForm(): void {}

    init(): void
    {
        if (this.dataRoute.action === 'create') 
        {
            this.lang = <Lang>_.find(this.langs, {'id': this.baseLang}); // get baseLang object

            // to create a new object, do all queries to get relations data to create new object
            this.relationsObject();

            // set lang_id if form has this field
            // call after setData() to overwrite lang_id field with correct value
            if (this.fg.contains('lang_id')) 
            {
                this.fg.patchValue({
                    lang_id: this.lang.id // set lang id in form from object with multiple language
                });
            }
            return;
        }

        // Create lang or edit object for objects with multi language
        if (this.params['lang_id'] !== undefined) 
        {
            this.lang = <Lang>_.find(this.langs, {'id': this.params['lang_id']}); // get lang object

            // get baseLang record
            if (this.dataRoute.action === 'create-lang') 
            {
                // create copy object for change readonly properties
                const baseParams = _.clone(this.params); // clone object because params properties are read-only, you can use Object.assign({}, this.params)
                baseParams['lang_id'] = this.baseLang; // set baseLang to get object

                this.getRecord(baseParams); // get baseLang object
            }
            else if (this.dataRoute.action === 'edit') 
            {
                this.getRecord(this.params);
            }
        } 
        else 
        {
            // edit object without multilanguague and create lang
            this.getRecord(this.params);
        }
    }

    // function to get record in edit action or create lang action
    getRecord(params: Params): void
    {
        const ob$ = this.http
            .apolloClient()
            .watchQuery({
                query: this.graphQL.queryObject,
                // do it in separate function to may be rewrite, for example in FieldGroupDetailComponent
                variables: this.argumentsGetRecord(params)
            })
            .valueChanges
            .subscribe(({data}) => {
                ob$.unsubscribe();

                if (this.env.debug) console.log('DEBUG - response of query to get object: ', data);

                // instance data in relations fields of object
                this.setRelationsData(data);

                // instance data on object list
                this.setData(data['coreObject']);
            });
    }

    // get args, in any case that you need create a query with aditonal arguments
    // for axample in FieldGroupDetailComponent, or specify field name in queries with joins
    argumentsGetRecord(params: Params): any 
    {
        let args;

        // set paramenters for objects that has lang_id and id
        if (params['lang_id'] && params['id']) {
            // check if object has table lang
            const table = this.graphQL.tableLang ? this.graphQL.tableLang : this.graphQL.table;
            args = {
                sql: [{
                    command: 'where',
                    column: `${table}.id`,
                    operator: '=',
                    value: params['id']
                },
                {
                    command: 'where',
                    column: `${table}.lang_id`,
                    operator: '=',
                    value: params['lang_id']
                }]
            };

        } 
        else 
        {
            args = {
                sql: [{
                    command: 'where',
                    column: `${this.graphQL.table}.id`,
                    operator: '=',
                    value: params['id']
                }]
            };
        }

        args = this.getCustomArgumentsGetRecord(args, params);

        if (this.env.debug) console.log('DEBUG - arguments to get object: ', args);

        return args;
    }

    // instance custom arguments, for example in field-detail.component.ts
    // default merge relations arguments with argumens
    getCustomArgumentsGetRecord(args: object, params: Params): object
    {
        return Object.assign({}, args, this.argumentsRelationsObject());
    }

    /**
     * Function to get relations object, normally used to create object
     */
    relationsObject(): void 
    {
        if (this.graphQL.relationsFields && this.graphQL.relationsFields !== '') 
        {
            const args = this.argumentsRelationsObject();
            let options;

            // check if there are any variable
            if (args) {
                options = {
                    query: this.graphQL.queryRelationsObject,
                    variables: args
                };
            } 
            else 
            {
                options = {
                    query: this.graphQL.queryRelationsObject
                };
            }

            if (this.env.debug) console.log('DEBUG - options of relations to create object: ', options);

            const ob$ = this.http
                .apolloClient()
                .watchQuery(options)
                .valueChanges
                .subscribe(({data}) => {
                    ob$.unsubscribe();

                    this.showSpinner = false;

                    this.setRelationsData(data);
                });
        }
        else
        {
            this.showSpinner = false;
        }
    }

    // get arguments, for example in payment-method-detail.component.ts
    argumentsRelationsObject(): object
    {
        return undefined;
    }

    // create all elements whith graphQL data obtain from method relationsObject()
    // this function load realtion data to create object or edit object
    setRelationsData(data: any): void { }


    // function that will be call for create object, create lang object and update object
    // pass object with data if is a edit action, else the object is empty
    postRecord(object: any, routeRedirect?: any[]): void
    {
        // appear spinner in button
        this.loadingButton = true;

        // set errors from current form, this variable is binded to all form elements
        this.formErrors = this.validationMessageService.setErrors(this.fg); 

        if (this.fg.invalid) 
        {
            // TODO, show general error
            console.log(this.fg);

            // disappear spinner in button
            this.loadingButton = false;
            return; // has any validation error when emit submit event
        }

        let record$: Observable<any>; // Observable
        let args = {}; // arguments for observable

        if (this.fg.get('id')) 
        {
            // Usually the id is disabled, we enable it if you need tale id data for create or edit
            this.fg.get('id').enable(); // enable is a method from AbstractControl
        }

        // add payload to arguments
        args['payload'] = this.fg.value;

        // call method that can to be overwrite by children
        args = this.getCustomArgumentsPostRecord(args, object);

        if (this.dataRoute.action === 'create') 
        {
            // call method that can to be overwrite by children
            args = this.getCustomArgumentsCreatePostRecord(args, object);

            if (this.env.debug) console.log('DEBUG - args sending to create object: ', args);

            record$ = this.http
                .apolloClient()
                .mutate({
                    mutation: this.graphQL.mutationCreateObject,
                    variables: args
                });
        }

        if (this.dataRoute.action === 'create-lang')
        {
            // remove id to avoid confict with duplicate id
            delete args['payload']['ix'];

            // call method that can to be overwrite by children
            args = this.getCustomArgumentsCreateLangPostRecord(args, object);

            if (this.env.debug) console.log('DEBUG - args sending to create lang object: ', args);

            record$ = this.http
                .apolloClient()
                .mutate({
                    mutation: this.graphQL.mutationCreateObject,
                    variables: args
                });
        }

        if (this.dataRoute.action === 'edit') 
        {
            // call method that can to be overwrite by children
            args = this.getCustomArgumentsEditPostRecord(args, object);

            if (this.env.debug) console.log('DEBUG - args sending to edit object: ', args);

            record$ = this.http
                .apolloClient()
                .mutate({
                    mutation: this.graphQL.mutationUpdateObject,
                    variables: args
                });
        }

        record$
            .subscribe(data => {

                if (this.env.debug) console.log('DEBUG - data from postRecord method: ', data);

                // disappear spinner in button
                this.loadingButton = false;

                // manage errors
                if (data.errors)
                {
                    let message = null;
                    if (data.errors[0].errorInfo)
                    {
                        message = data.errors[0].errorInfo[2]
                                  + '\nSQLSTATE: ' + data.errors[0].errorInfo[0]
                                  + '\nCODE: ' + data.errors[0].errorInfo[1];
                    }
                    else if (data.errors[0].validationErrors &&  typeof data.errors[0].validationErrors === 'object')
                    {
                        message = data.errors[0].message + '. ' + data.errors[0].debugMessage;
                        for (const property in data.errors[0].validationErrors)
                        {
                            if (data.errors[0].validationErrors.hasOwnProperty(property))
                            {
                                message += '\n' + property + ': ' + data.errors[0].validationErrors[property];
                            }
                        }
                    }
                    else if (data.errors[0].debugMessage)
                    {
                        message = data.errors[0].message + '. ' + data.errors[0].debugMessage;
                    }
                    else
                    {
                        message = data.errors[0].message;
                    }
                    this.snackBar.open(
                        message, 
                        this.translations['APPS.ERROR'], 
                        {
                            verticalPosition: 'top',
                            duration        : 5000,
                            panelClass      : ['red-snackbar', 'multi-line-snackbar']
                        }
                    );
                }
                else
                {
                    let snackBarMessage;

                    // set dialog message
                    if (this.objectTranslationTranslated)
                    {
                        snackBarMessage = (this.objectTranslationTranslated + ' ' + this.translations['APPS.SAVED.' + (this.objectTranslationGender ? this.objectTranslationGender : 'M')]).toLocaleLowerCase().capitalize();
                    }
                    else
                    {
                        snackBarMessage = (this.translations[this.objectTranslation] + ' ' + this.translations['APPS.SAVED.' + (this.objectTranslationGender ? this.objectTranslationGender : 'M')]).toLocaleLowerCase().capitalize();
                    }
                    
                    this.snackBar.open(
                        snackBarMessage,
                        this.translations['APPS.OK'], 
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        }
                    );
    
                    if (! routeRedirect)
                    {
                        this.router.navigate([this.baseUri]); 
                    }
                    else
                    {
                        this.router.navigate(routeRedirect);
                    }
                }
            });
    }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsPostRecord(args: any, object: any): object { return args; }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsCreatePostRecord(args: any, params: Params): object { return args; }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsCreateLangPostRecord(args: any, params: Params): object { return args; }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsEditPostRecord(args: any, params: Params): object { return args; }
}

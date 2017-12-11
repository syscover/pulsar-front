import { CoreComponent } from './core.component';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import { Injector, HostBinding, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Lang } from './../../admin/admin.models';
import { DataRoute } from './../classes/data-route';
import { setErrorsOnSubmitFormGroup } from './../super/core-validation';
import { environment } from './../../../environments/environment';
import * as _ from 'lodash';

export class CoreDetailComponent extends CoreComponent implements OnInit {

    @HostBinding('class') classes = 'animated fadeIn';

    dataRoute: DataRoute; // static dataRoute Object pass from route module
    formErrors: Object;
    fg: FormGroup;
    fb: FormBuilder;
    lang: Lang; // Current lang for objects that has multiple language
    object: Object = {}; // set empty object

    constructor(
        protected injector: Injector,
        protected graphQL: GraphQLModel
    ) {
        super(injector, graphQL);
        this.fb = injector.get(FormBuilder);

        // set object properties
        this.dataRoute = <DataRoute>this.route.snapshot.data;

        // create form, this method will be overwrite by child class
        this.createForm();
    }

    // Function that can to be overwrite in child class
    setData(response = undefined) {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response; // function to set custom data

            this.beforePatchValueEdit();

            this.fg.patchValue(this.object); // set values of form

            this.afterPatchValueEdit();

            // only form objects with create lang action
            if (this.dataRoute.action === 'create-lang') {

                this.fg.patchValue({
                    // set lang id in form from object with multiple language
                    lang_id: this.lang.id
                });
            }
        }
    }

    // method to implement actions befere patch value in edit action
    beforePatchValueEdit() {}

    // method to implement actions after patch value in edit action
    afterPatchValueEdit() {}

    // method that will be overwrite
    createForm() { }

    ngOnInit() {
        this.init();
    }

    init() {
        if (this.dataRoute.action === 'create') {
            this.lang  = <Lang>_.find(this.langs, {'id': this.baseLang}); // get baseLang object

            // to create a new object, do all queries to get relations data to create new object
            this.relationsObject();

            // set lang_id if form has this field
            // call after setData() to overwrite lang_id field with correct value
            if (this.fg.contains('lang_id')) {
                this.fg.patchValue({
                    lang_id: this.lang.id // set lang id in form from object with multiple language
                });
            }
            return;
        }

        // Create lang or edit object for objects with multi language
        if (this.params['lang_id'] !== undefined) {
            this.lang = <Lang>_.find(this.langs, {'id': this.params['lang_id']}); // get lang object

            // get baseLang record
            if (this.dataRoute.action === 'create-lang') {
                let baseParams = _.clone(this.params); // clone objet because params properties are read-only
                baseParams['lang_id'] = this.baseLang; // set baseLang to get object

                this.getRecord(baseParams); // get baseLang object

            } else if (this.dataRoute.action === 'edit') {
                this.getRecord(this.params);
            }

        } else {
            // edit object without multilanguague and create lang
            this.getRecord(this.params);
        }
    }

    // function to get record in edit action or create lang action
    getRecord(params: Params) {
        let subs = this.objectService
            .proxyGraphQL()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: this.graphQL.queryObject,
                // do it in separate function to may be rewrite, for examle in FieldGroupDetailComponent
                variables: this.argumentsGetRecord(params)
            })
            .subscribe(({data}) => {
                if (environment.debug) console.log('DEBUG - response of query to get object: ', data);

                // instance data in relations fields of object
                this.setRelationsData(data);

                // instance data on object list
                this.setData(data['coreObject']);

                subs.unsubscribe();
            });
    }

    // get args, in any case that you need create a query with aditonal arguments
    // for axample in FieldGroupDetailComponent, or specify field name in queries with joins
    argumentsGetRecord(params: Params): any {
        let args;

        // set paramenters for objects that has lang_id and id
        if (params['lang_id'] && params['id']) {
            // check if object has table lang
            let table = this.graphQL.tableLang ?  this.graphQL.tableLang : this.graphQL.table;
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

        } else {
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

        if (environment.debug) console.log('DEBUG - arguments to get object: ', args);

        return args;
    }

    // instante custom arguments, for example in field-detail.component.ts
    // default merge relations arguments with argumens
    getCustomArgumentsGetRecord(args: Object, params: Params): any {
        return Object.assign({}, args, this.argumentsRelationsObject());
    }

    /**
     * Function to get relations object, normally used to create object
     */
    relationsObject(): void {
        if (this.graphQL.relationsFields && this.graphQL.relationsFields !== '') {

            let args = this.argumentsRelationsObject();

            let options;

            // check if there are any variable
            if (args) {
                options = {
                    fetchPolicy: 'network-only',
                    query: this.graphQL.queryRelationsObject,
                    variables: args
                };
            } else {
                options = {
                    fetchPolicy: 'network-only',
                    query: this.graphQL.queryRelationsObject
                };
            }

            if (environment.debug) console.log('DEBUG - options of relations to create object: ', options);

            let subs = this.objectService
                .proxyGraphQL()
                .watchQuery(options)
                .subscribe(({data}) => {
                    this.setRelationsData(data);
                    subs.unsubscribe();
                });
        }
    }

    // get arguments, for example in payment-method-detail.component.ts
    argumentsRelationsObject(): Object {
        return undefined;
    }

    // create all elements whith graphQL data obtain from method relationsObject()
    // this function load realtion data to create object or edit object
    setRelationsData(data: any) { }


    // funtion that will be call for create object, create lang object and update object
    postRecord(object: any, routeRedirect: string = undefined, params = []) {

        // set errors from current form, this variable is binded to all form elements
        this.formErrors = setErrorsOnSubmitFormGroup(this.fg);

        if (this.fg.invalid) {
            // TODO, show general error
            console.log(this.fg.errors);
            return; // has any validation error when emit submit event
        }

        let obs: Observable<any>; // Observable
        let args = {}; // arguments for observable

        if (this.fg.get('id')) {
            // Usually the id is disabled, we enable it if you need tale id data for create or edit
            this.fg.get('id').enable(); // enable is a method from AbstractControl
        }

        // add object to arguments
        args['object'] = this.fg.value;

        // call method that can to be overwrite by children
        args = this.getCustomArgumentsPostRecord(args, object);

        if (this.dataRoute.action === 'create') {

            // call method that can to be overwrite by children
            args = this.getCustomArgumentsCreatePostRecord(args, object);

            if (environment.debug) console.log('DEBUG - args sending to create object: ', args);

            obs = this.objectService
                .proxyGraphQL()
                .mutate({
                    mutation: this.graphQL.mutationAddObject,
                    variables: args
                });
        }
        if (this.dataRoute.action === 'create-lang') {

            // remove id to avoid confict with duplicate id
            delete args['object']['ix'];

            // call method that can to be overwrite by children
            args = this.getCustomArgumentsCreateLangPostRecord(args, object);

            if (environment.debug) console.log('DEBUG - args sending to create lang object: ', args);

            obs = this.objectService
                .proxyGraphQL()
                .mutate({
                    mutation: this.graphQL.mutationAddObject,
                    variables: args
                });
        }
        if (this.dataRoute.action === 'edit') {

            // call method that can to be overwrite by children
            args = this.getCustomArgumentsEditPostRecord(args, object);

            if (environment.debug) console.log('DEBUG - args sending to edit object: ', args);

            obs = this.objectService
                .proxyGraphQL()
                .mutate({
                    mutation: this.graphQL.mutationUpdateObject,
                    variables: args
                });
        }

        let subs = obs.subscribe(data => {
            if (! routeRedirect) {
                this.router.navigate([this.baseUri]);
            } else {
                this.router.navigate([routeRedirect]);
            }
            subs.unsubscribe();
        });
    }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsPostRecord(args: Object, object: any): Object { return args; }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsCreatePostRecord(args: Object, params: Params): Object { return args; }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsCreateLangPostRecord(args: Object, params: Params): Object { return args; }

    /**
     * Method to be overwrite
     * @param args  Object
     * @param params Params
     */
    getCustomArgumentsEditPostRecord(args: Object, params: Params): Object { return args; }
}

import { CoreComponent } from './core.component';
import { CoreService } from './core.service';
import { Injector, HostBinding, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Lang } from './../../admin/admin.models';
import { DataRoute } from './../classes/data-route';
import { DatatableSearchComponent } from './../components/datatable-search/datatable-search.component';
import { setErrorsOnSubmitFormGroup } from './../super/core-validation';

import * as _ from 'lodash';

import gql from 'graphql-tag';

export class CoreDetailComponent extends CoreComponent implements OnInit {

    @HostBinding('class') classes = 'animated fadeIn';

    dataRoute: DataRoute; // static dataRoute Object pass from route module
    formErrors: Object;
    fg: FormGroup;
    fb: FormBuilder;
    lang: Lang; // Current lang for objects that has multiple language
    object: Object = {}; // set empty object
    // Function that can to be overwrite in child class
    customCallback: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response; // function to set custom data
            this.fg.patchValue(this.object); // set values of form

            // only form objects with create lang action
            if (this.dataRoute.action === 'create-lang') {
                this.fg.patchValue({
                    // set lang id in form from object with multiple language
                    lang_id: this.lang.id
                });
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: CoreService
    ) {
        super(injector, objectService);
        this.fb = injector.get(FormBuilder);

        // set object properties
        this.dataRoute = <DataRoute>this.route.snapshot.data;

        // create form, this method will be overwrite by child class
        this.createForm();
    }

    // method that will be overwrite
    createForm() { }

    ngOnInit() {
        this.init();
    }

    init() {

        if (this.dataRoute.action === 'create') {
            this.lang  = <Lang>_.find(this.langs, {'id': this.baseLang}); // get baseLang object
            this.customCallback();

            // set lang_id if form has this field
            // call after customCallback() to overwrite lang_id field with correct value
            if (this.fg.contains('lang_id')) {
                this.fg.patchValue({
                    lang_id: this.lang.id // set lang id in form from object with multiple language
                });
            }
            return;
        }

        // Create lang or edit object for objects with multi language
        if (this.params['lang'] !== undefined) {
            this.lang = <Lang>_.find(this.langs, {'id': this.params['lang']}); // get lang object

            // get baseLang record
            if (this.dataRoute.action === 'create-lang') {
                let baseParams = _.clone(this.params); // clone objet because params properties are read-only
                baseParams['lang'] = this.baseLang; // set baseLang to get object

                this.getRecord(baseParams); // get baseLang object

            } else if (this.dataRoute.action === 'edit') {
                this.getRecord(this.params);
            }

        } else {
            // edit action and create lang
            this.getRecord(this.params);
        }
    }

    getRecord(params: Params) {
        /********************* START REST *********************/
        // instance object
        /*this.objectService
            .getRecord(params)
            .subscribe(data => {
                this.customCallback(data);
            });*/
        /********************* END REST *********************/

        let args = {
            sql: [{
                command: 'where',
                column: 'id',
                operator: '=',
                value: params['id']
            }]
        };

        this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.grahpQL.queryObject,
                variables: args
            }).subscribe(({data}) => {
                // instance data on object list
                this.customCallback(data[this.grahpQL.objectName]);
            });
    }

    onSubmit(object: any, routeRedirect: string = undefined, params = []) {

        let obs: Observable<any>; // Observable

        // set errors from current form, this variable is binded to all form elements
        this.formErrors = setErrorsOnSubmitFormGroup(this.fg);

        if (this.fg.invalid) {
            // TODO, show general error
            console.log(this.fg);
            return; // has any validation error when emit submit event
        }

        if (this.dataRoute.action === 'create') {
            obs = this.objectService
                .proxyGraphQL()
                .mutate({
                    mutation: this.grahpQL.mutationAddObject,
                    variables: this.fg.value
                });
        }
        if (this.dataRoute.action === 'create-lang') {
            // Usually the id is disabled, we enable it if you are going to create a new language
            this.fg.get('id').enable(); // enable is a method from AbstractControl

            obs = this.objectService.storeRecord(this.fg.value);
        }
        if (this.dataRoute.action === 'edit') {

            params.push(object.id);
            // check if has languages and lang_id is property lang.
            // for example, in user lang_id is form determinate user lang, not property lang
            if (this.fg.contains('lang_id') && (! this.fg.contains('check_lang_id') || this.fg.controls['check_lang_id'].value)) {
                params.push(this.fg.controls['lang_id'].value);
            }

            let args = this.fg.value;
            // if route has id param, take this value how idOld
            if (this.params['id']) {
                args['idOld'] = this.params['id'];
            }

            obs = this.objectService
                .proxyGraphQL()
                .mutate({
                    mutation: this.grahpQL.mutationUpdateObject,
                    variables: args
                });
        }

        obs.subscribe(data => {
            if (! routeRedirect) {
                this.router.navigate([this.baseUri]);
            } else {
                this.router.navigate([routeRedirect]);
            }
        });
    }

    deleteRecord(object: any, routeRedirect: string = undefined, langAux: string = undefined, params = []): void {

        params.push(object.id);

        if (object.lang_id) {   // check if has languages
            params.push(object.lang_id);
        } else {
            // chek if has force lang, this options is used in object with multiple lang in json
            // for example table field
            if (langAux !== undefined) {
                params.push(langAux);
            }
        }

        // confirm to delete object
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete this object?',
            accept: () => {
                this.objectService
                    .deleteRecord(params)
                    .subscribe(data => {
                        if (! routeRedirect) {
                            this.router.navigate([this.baseUri]);
                        } else {
                            this.router.navigate([routeRedirect]);
                        }
                    });
            }
        });
    }
}

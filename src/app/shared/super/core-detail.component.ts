import { CoreComponent } from './core.component';
import { Injector, HostBinding } from '@angular/core';
import { Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';

import { Lang } from './../../admin/admin.models';
import { DataRoute } from './../classes/data-route';
import { DatatableSearchComponent } from './../components/datatable-search/datatable-search.component';
import { setErrorsOnSubmitFormGroup } from './../super/core-validation';

import * as _ from 'lodash';

export class CoreDetailComponent extends CoreComponent {

    @HostBinding('class') classes = 'animated fadeIn';

    protected dataRoute: DataRoute; // Static dataRoute Object pass from route module
    protected formErrors: Object;
    protected fg: FormGroup;
    protected fb: FormBuilder;
    protected confirmationService;
    protected lang: Lang; // Current lang for objects that has multiple language

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.fb = injector.get(FormBuilder);

        // set object properties
        this.dataRoute = <DataRoute>this.route.snapshot.data;
    }

    getRecordHasIdParamenter(f: Function) {

        if (this.dataRoute.action === 'create') {
            this.lang  = <Lang>_.find(this.langs, {'id': this.configService.getConfig('base_lang')}); // get base_lang object
            f();

            // set lang_id if form has this field
            // call after f() to overwrite lang_id field with correct value
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
                baseParams['lang'] = this.configService.getConfig('base_lang'); // set baseLang to get object

                this.getRecord(f, baseParams); // get base_lang object

            } else if (this.dataRoute.action === 'edit') {
                this.getRecord(f, this.params);
            }

        } else {
            // edit action and create lang
            this.getRecord(f, this.params);
        }
    }

    getRecord(f: Function, params: Params) {
        this.objectService.getRecord(params).subscribe(data => f(data));
    }

    onSubmit(fg: FormGroup, object: any, routeRedirect: string = undefined, params = []) {

        let obs: Observable<any>; // Observable

        // set errors from current form, this variable is binded to all form elements
        this.formErrors = setErrorsOnSubmitFormGroup(this.fg);

        if (this.fg.invalid) {
            // TODO, show general error
            return; // has any validation error when emit submit event
        }

        if (this.dataRoute.action === 'create') {
            obs = this.objectService.storeRecord(fg.value);
        }
        if (this.dataRoute.action === 'create-lang') {
            // Usually the id is disabled, we enable it if you are going to create a new language
            fg.get('id').enable(); // enable is a method from AbstractControl

            obs = this.objectService.storeRecord(fg.value);
        }
        if (this.dataRoute.action === 'edit') {

            params.push(object.id);
            if (fg.contains('lang_id')) { // check if has languages
                params.push(fg.controls['lang_id'].value);
            }

            obs = this.objectService.updateRecord(fg.value, params);
        }

        obs.subscribe(data => {
            if (! routeRedirect) {
                this.router.navigate([this.objectService.baseUri]);
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
                            this.router.navigate([this.objectService.baseUri]);
                        } else {
                            this.router.navigate([routeRedirect]);
                        }
                    });
            }
        });
    }
}

import { Injector, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';

import { CoreService } from './core.service';
import { ConfigService } from './../../core/services/config.service';
import { LangService } from './../../admin/lang/lang.service';
import { Lang } from './../../admin/admin.models';
import { DataRoute } from './../classes/data-route';
import { onSubmitFormGroup } from './../super/core-validation';

export class CoreDetailComponent {

    @HostBinding('class') classes = 'animated fadeIn';

    protected dataRoute: DataRoute; // Static dataRoute Object pass from route module
    protected params: Params;
    protected formErrors: Object;
    protected fg: FormGroup;
    protected fb: FormBuilder;
    protected router: Router;
    protected route: ActivatedRoute;
    protected confirmationService;
    protected lang: Lang; // Current lang for objects that has multiple language

    // services superclass
    protected configService: ConfigService;
    protected objectService: CoreService;
    protected langService: LangService;

    constructor(
        protected injector: Injector
    ) {
        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.fb = injector.get(FormBuilder);
        this.configService = injector.get(ConfigService);
        this.langService = injector.get(LangService);

        this.dataRoute = <DataRoute>this.route.snapshot.data;
    }

    getRecordHasIdParamenter(f: Function) {
        this.route.params.subscribe(params => {
            this.params     = params;
            const id        = params['id'];
            const lang      = params['lang'];

            if (this.dataRoute.action === 'create') {
                this.lang = this.configService.getConfig('base_lang');  // for objets with multiple languages
                f();

                // set lang_id if form has this field
                // call after f() to overwrite lang_id field with correct value
                if(this.fg.contains('lang_id')) {
                    this.fg.patchValue({
                        lang_id: this.lang.id // set lang id in form from object with multiple language
                    });
                }

                return;
            }

            // Actions to lang objects
            const langId = this.dataRoute.action === 'create-lang' ? this.params['newLang'] : this.params['lang'];
            if( langId !== undefined) {
                this.langService.getRecord(langId)
                    .subscribe(response2 => {
                        this.lang = response2.data;
                    });

                // edit action and create lang
                this.getRecord(f, id, lang);

                // set lang_id if form has this field
                // call after f() to overwrite lang_id field with correct value
                if(this.fg.contains('lang_id')) {
                    this.fg.patchValue({
                        lang_id: langId // set lang id in form from object with multiple language
                    });
                }
            }
            else
            {
                // edit action and create lang
                this.getRecord(f, id, lang);
            }
        });
    }

    getRecord(f: Function, id: any, lang: string = undefined) {
        this.objectService.getRecord(id, lang).subscribe(data => f(data));
    }

    onSubmit(fg: FormGroup, object: any, routeRedirect: string = undefined) {

        let obs: Observable<any>; // Observable
        let lang: string;

        // set errors, this variable is binded to all form elements
        this.formErrors = onSubmitFormGroup(this.fg);

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

            let values = fg.value; // get values from form
            values.lang_id = this.params['newLang'];

            obs = this.objectService.storeRecord(values);
        }
        if (this.dataRoute.action === 'edit') {
            if (object.lang_id) { // check if has languages
                lang = object.lang_id;
            }
            obs = this.objectService.updateRecord(fg.value, object.id, lang);
        }

        obs.subscribe(data => {
            if (! routeRedirect) {
                this.router.navigate([this.objectService.baseUri]);
            } else {
                this.router.navigate([routeRedirect]);
            }
        });
    }

    deleteRecord(object: any, routeRedirect: string = undefined): void {

        let lang: string;

        if (object.lang_id) {   // check if has languages
            lang = object.lang_id;
        }

        // confirm to delete object
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete this object?',
            accept: () => {
                this.objectService
                    .deleteRecord(object.id, lang)
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

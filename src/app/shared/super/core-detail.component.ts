import { OnInit, ReflectiveInjector } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { CoreService } from './core.service';
import { Lang } from './../../admin/admin.models';
import { DataRoute } from './../classes/data-route';
import { onSubmitFormGroup } from './../super/core-validation';
import { ValidationMessageService } from './../../core/services/validation-message.service';

export class CoreDetailComponent {

    public dataRoute: DataRoute; // Static dataRoute Object pass from route module
    public params: Params;
    public formErrors: Object;
    public fg: FormGroup;

    private validationMessageService: ValidationMessageService

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private parentService: CoreService
    ) {
        const injector = ReflectiveInjector.resolveAndCreate([
                ValidationMessageService
            ]);

        this.validationMessageService = injector.get(ValidationMessageService);
        this.dataRoute = <DataRoute>this.route.snapshot.data;
    }

    getRecordHasIdParamenter(f: Function) {
        this.route.params.subscribe(params => {
            this.params     = params;
            const id        = params['id'];
            const lang      = params['lang'];

            if (this.dataRoute.action === 'create') {
                f();
                return;
            }

            // edit action and create lang
            this.getRecord(f, id, lang);
        });
    }

    getRecord(f: Function, id: any, lang: string = undefined) {
        this.parentService.getRecord(id, lang).subscribe(data => f(data));
    }

    onSubmit(fg: FormGroup, object: any, routeRedirect: string = undefined) {

        let obs: Observable<any>; // Observable
        let lang: string;

        this.formErrors = onSubmitFormGroup(this.fg, this.validationMessageService);

        if (this.fg.invalid) {
            return; // has any validation error when emit submit event
        }

        if (this.dataRoute.action === 'create') {
            obs = this.parentService.storeRecord(fg.value);
        }
        if (this.dataRoute.action === 'create-lang') {
            let values = fg.value;
            values.lang_id = this.params['newLang'];

            obs = this.parentService.storeRecord(values);
        }
        if (this.dataRoute.action === 'edit') {
            if (object.lang_id) { // check if has languages
                lang = object.lang_id;
            }
            obs = this.parentService.updateRecord(fg.value, object.id, lang);
        }

        obs.subscribe(data => {
            if (! routeRedirect) {
                this.router.navigate([this.parentService.baseUri]);
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

        this.parentService
            .deleteRecord(object.id, lang)
            .subscribe(data => {
                if (! routeRedirect) {
                    this.router.navigate([this.parentService.baseUri]);
                } else {
                    this.router.navigate([routeRedirect]);
                }
            });
    }
}

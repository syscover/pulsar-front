import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { CoreService } from './core.service';
import { Lang } from './../../admin/admin.models';
import { DataRoute } from './../classes/data-route';

export class CoreDetailComponent {

    public dataRoute: DataRoute; // Static dataRoute Object pass from route module
    public params: Params;
    public formErrors: Object;

    constructor(
        private parentRouter: Router,
        private parentRoute: ActivatedRoute,
        private parentService: CoreService
    ) {
        this.dataRoute = <DataRoute>this.parentRoute.snapshot.data;
    }

    getRecordHasIdParamenter(f: Function) {
        this.parentRoute.params.subscribe(params => {
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
                this.parentRouter.navigate([this.parentService.baseUri]);
            } else {
                this.parentRouter.navigate([routeRedirect]);
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
                    this.parentRouter.navigate([this.parentService.baseUri]);
                } else {
                    this.parentRouter.navigate([routeRedirect]);
                }
            });
    }
}

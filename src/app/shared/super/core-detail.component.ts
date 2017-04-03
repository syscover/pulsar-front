import { Lang } from './../../admin/admin.models';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { CoreService } from './core.service';

export class CoreDetailComponent {

    public action: string;

    constructor(
        private parentRouter: Router,
        private parentRoute: ActivatedRoute,
        private parentService: CoreService
    ) { }

    getRecordHasIdParamenter(f: Function) {
        this.parentRoute.params.subscribe(params => {
            const id    = params['id'];
            const lang  = params['lang'];

            if (! id) { // check if route has id param
                this.action = 'create';
                return;
            }
            this.action = 'edit';
            this.getRecord(f, id, lang);
        });
    }

    getRecord(f: Function, id: any, lang: string = undefined) {
        this.parentService.getRecord(id, lang).subscribe(data => f(data));
    }

    onSubmit(fg: FormGroup, object: any, routeRedirect: string) {

        let obs: Observable<any>; // Observable
        let lang: string;

        if (object.id) {
            if (object.lang_id) { // check if has languages
                lang = object.lang_id;
            }
            obs = this.parentService.updateRecord(fg.value, object.id, lang);
        } else {
            obs = this.parentService.storeRecord(fg.value);
        }

        obs.subscribe(data => this.parentRouter.navigate([routeRedirect]));
    }
}

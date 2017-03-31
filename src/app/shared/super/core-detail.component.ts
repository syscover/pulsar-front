import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { CoreService } from './core.service';

export class CoreDetailComponent {

    constructor(
        private parentRouter: Router,
        private parentRoute: ActivatedRoute,
        private parentService: CoreService
    ) { }

    getRecordHasIdParamenter(f: Function) {
        this.parentRoute.params.subscribe(params => {
            const id    = params['id'];
            const lang  = params['lang'];
            if (! id) { return; } // check if route has id param

            if (! lang) {
                this.getRecord(id, f);
            }else {
                this.getLangRecord(id, lang, f);
            }
        });
    }

    getRecord(id: any, f: Function) {
        this.parentService.getRecord(id).subscribe(data => f(data));
    }

    getLangRecord(id: any, lang: string, f: Function) {
        this.parentService.getLangRecord(id, lang).subscribe(data => f(data));
    }

    onSubmit(fg: FormGroup, object: any, routeRedirect: string) {

        let obs: Observable<any>; // Observable

        if (object.id) {
            obs = this.parentService.updateRecord(object.id, fg.value);
        } else {
            obs = this.parentService.storeRecord(fg.value);
        }

        obs.subscribe(data => this.parentRouter.navigate([routeRedirect]));
    }
}

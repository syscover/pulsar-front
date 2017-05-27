import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { ActionService } from './action.service';
import { Action } from '../admin.models';

@Component({
    selector: 'ps-action-detail',
    templateUrl: './action-detail.component.html'
})
export class ActionDetailComponent extends CoreDetailComponent implements OnInit {

    // paramenters for parent class
    private object: Action = new Action(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.setValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: ActionService
    ) {
        super(injector);
    }

    ngOnInit() {
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', Validators.required ],
            name: ['', Validators.required ]
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { ActionService } from './action.service';
import { Action } from '../admin.models';

@Component({
    selector: 'ps-action-detail',
    templateUrl: './action-detail.component.html'
})
export class ActionDetailComponent extends CoreDetailComponent implements OnInit {

    private formDetail: FormGroup;
    private object: Action = new Action(); // set empty object
    private f: Function = data => this.object = data; // function to set custom data

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private objectService: ActionService
    ) {
        super(
            router,
            route,
            objectService
        );
        this.createForm(); // create form
    }

    ngOnInit() {
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.formDetail = this.fb.group({
            id: ['', Validators.required ],
            name: ''
        });
    }

}

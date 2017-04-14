import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { GroupService } from './group.service';
import { Group } from '../crm.models';

@Component({
    selector: 'ps-group-detail',
    templateUrl: './group-detail.component.html'
})
export class GroupDetailComponent extends CoreDetailComponent implements OnInit {

    // paramenters for parent class
    private fg: FormGroup;
    private object: Group = new Group(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.setValue(this.object); // set values of form
        }
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private objectService: GroupService
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
        this.createForm(); // create form
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }

}

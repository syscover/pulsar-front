import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { ProfileService } from './profile.service';
import { Profile } from '../admin.models';

@Component({
    selector: 'ps-profile-detail',
    templateUrl: 'profile-detail.component.html'
})
export class ProfileDetailComponent extends CoreDetailComponent implements OnInit {

    private formDetail: FormGroup;
    private object: Profile = new Profile(); // set empty object
    private f: Function = (data = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = data; // function to set custom data
        }
        // with other action
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private objectService: ProfileService,
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

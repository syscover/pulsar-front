

    /*ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.profileService.getRecord(+params['id']))
            .subscribe(
                profile     => this.profile = profile,
                error       => this.errorMessage = <any>error
            );
     }*/



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
    private f: Function = data => this.object = data; // function to set custom data

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

    onSubmit() {
        super.onSubmit(this.formDetail, this.object, '/pulsar/admin/profiles');
    }

}
import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { UserService } from './user.service';
import { User, Profile, Lang } from './../admin.models';

// custom imports
import { ProfileService } from './../profile/profile.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent extends CoreDetailComponent implements OnInit {

    profiles: SelectItem[] = [];
    langsAux: SelectItem[] = [];

    // paramenters for parent class
    object: User = new User(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected profileService: ProfileService,
        protected objectService: UserService
    ) {
        super(injector);
        this.baseUri = objectService.baseUri;
    }

    ngOnInit() {
        this.profileService.getRecords()
            .subscribe((response) => {

            this.profiles = _.map(<Profile[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            });

            this.profiles.unshift({ label: 'Select a profile', value: '' });

            super.getRecordHasIdParamenter(this.f);
        });

        this.langsAux = _.map(<Lang[]>this.langs, obj => {
            return { value: obj.id, label: obj.name };
        });
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            surname: '',
            email: ['', Validators.required ],
            lang_id: ['', Validators.required ],
            check_lang_id: false,
            profile_id: ['', Validators.required ],
            access: '',
            user: ['', Validators.required ],
            password: ''
        });
    }
}

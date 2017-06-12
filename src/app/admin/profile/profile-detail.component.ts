import { Component, OnInit, Injector } from '@angular/core';
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

    constructor(
        protected injector: Injector,
        protected objectService: ProfileService,
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        super.getRecordHasIdParamenter();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }
}

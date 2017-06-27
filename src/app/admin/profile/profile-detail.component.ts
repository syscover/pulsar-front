import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ProfileService } from './profile.service';
import { Profile } from '../admin.models';
import { ProfileGraphQL } from './profile-graphql';

@Component({
    selector: 'ps-profile-detail',
    templateUrl: 'profile-detail.component.html'
})
export class ProfileDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected objectService: ProfileService,
    ) {
        super(injector, objectService);
        this.grahpQL = new ProfileGraphQL();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }
}

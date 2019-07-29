import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { graphQL } from './profile.graphql';
import { Profile } from '../admin.models';

@Component({
    selector: 'dh2-admin-profile-detail',
    templateUrl: 'profile-detail.component.html',
    animations: fuseAnimations
})
export class ProfileDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'APPS.PROFILE';
    objectTranslationGender = 'M';
    profiles: Profile[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required],
            profile_id: ''
        });
    }

    setRelationsData(data: any): void
    {
        // admin packages
        this.profiles = data.adminProfiles;
    }
}

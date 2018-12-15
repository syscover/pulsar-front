import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './profile.graphql';

@Component({
    selector: 'dh2-admin-profile-detail',
    templateUrl: 'profile-detail.component.html',
    animations: fuseAnimations
})
export class ProfileDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'APPS.PROFILE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required]
        });
    }
}

import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ProfileGraphQLService } from './profile-graphql.service';

@Component({
    selector: 'dh2-profile-detail',
    templateUrl: 'profile-detail.component.html',
    animations: fuseAnimations
})
export class ProfileDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.PROFILE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: ProfileGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required]
        });
    }
}


import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { graphQL } from './profile.graphql';

@Component({
    selector: 'dh2-forem-profile-detail',
    templateUrl: 'profile-detail.component.html',
    animations: fuseAnimations
})
export class ProfileDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'APPS.PROFILE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector
    ) 
    {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required],
            publish: false
        });
    }
}

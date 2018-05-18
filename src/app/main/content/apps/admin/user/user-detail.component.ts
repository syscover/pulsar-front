import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { UserGraphQLService } from './user-graphql.service';

@Component({
    selector: 'dh2-user-detail',
    templateUrl: 'user-detail.component.html',
    animations: fuseAnimations
})
export class UserDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'ADMIN.USER';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: UserGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            surname: null,
            email: [null, Validators.required],
            lang_id: [null, Validators.required],
            profile_id: [null, Validators.required],
            access: false,
            user: [null, Validators.required],
            password: null
        });
    }
}


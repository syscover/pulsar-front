import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { OAuthClientGraphqlService } from './oauth-client-graphql.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { User } from '../admin.models';

@Component({
    selector: 'dh2-oauth-client-detail',
    templateUrl: 'oauth-client-detail.component.html',
    animations: fuseAnimations
})
export class OauthClientDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.CLIENT';
    objectTranslationGender = 'M';
    user: User;

    constructor(
        protected injector: Injector,
        protected graphQL: OAuthClientGraphqlService,
        private _authenticationService: AuthenticationService
    ) {
        super(injector, graphQL);
        this.user = this._authenticationService.user();
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            user_id: null,
            name: [null, Validators.required],
            redirect: [null, Validators.required]
        });
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        if (this.dataRoute.action === 'create')
        {
            this.fg.controls['user_id'].setValue( this.user.id);
        }
    }
}


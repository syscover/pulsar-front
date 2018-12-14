import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './oauth-access-token.graphql';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { User } from '../admin.models';

@Component({
    selector: 'dh2-oauth-access-token-detail',
    templateUrl: 'oauth-access-token-detail.component.html',
    animations: fuseAnimations
})
export class OauthAccessTokenDetailComponent extends CoreDetailComponent implements OnInit
{
    objectTranslation = 'ADMIN.ACCESS_TOKEN';
    objectTranslationGender = 'M';
    user: User;

    constructor(
        protected injector: Injector,
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
            name: [null, Validators.required]
        });
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        if (this.dataRoute.action === 'create')
        {
            this.fg.controls['user_id'].setValue(this.user.id);
        }
    }
}


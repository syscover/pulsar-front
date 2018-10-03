
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { OauthAccessTokenGraphqlService } from './oauth-access-token-graphql.service';

@Component({
    selector: 'dh2-oauth-access-token-list',
    templateUrl: './oauth-access-token-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class OauthAccessTokenListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.CLIENT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['oauth_access_tokens.id', 'oauth_access_tokens.user_id', 'oauth_access_tokens.client_id', 'oauth_access_tokens.name'];
    displayedColumns = ['oauth_access_tokens.id', 'oauth_access_tokens.name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: OauthAccessTokenGraphqlService
    ) {
        super(injector, graphQL);
    }
}

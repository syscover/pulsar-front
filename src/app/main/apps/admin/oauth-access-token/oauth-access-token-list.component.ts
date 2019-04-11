import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './oauth-access-token.graphql';

@Component({
    selector: 'dh2-admin-oauth-access-token-list',
    templateUrl: './oauth-access-token-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class OauthAccessTokenListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.CLIENT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['oauth_access_tokens.id', 'oauth_access_tokens.user_id', 'oauth_access_tokens.client_id', 'oauth_access_tokens.name'];
    displayedColumns = ['oauth_access_tokens.id', 'oauth_access_tokens.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

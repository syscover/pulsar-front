import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './oauth-client.graphql';

@Component({
    selector: 'dh2-admin-oauth-client-list',
    templateUrl: './oauth-client-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class OauthClientListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.CLIENT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['oauth_clients.id', 'oauth_clients.user_id', 'oauth_clients.name'];
    displayedColumns = ['oauth_clients.id', 'oauth_clients.name', 'oauth_clients.secret', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

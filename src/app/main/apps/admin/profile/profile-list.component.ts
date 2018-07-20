
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { ProfileGraphQLService } from './profile-graphql.service';

@Component({
    selector: 'dh2-profile-list',
    templateUrl: './profile-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class ProfileListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.PROFILE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_profile.id', 'admin_profile.name'];
    displayedColumns = ['admin_profile.id', 'admin_profile.name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: ProfileGraphQLService
    ) {
        super(injector, graphQL);
    }
}

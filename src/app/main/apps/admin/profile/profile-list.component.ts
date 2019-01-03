import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './profile.graphql';

@Component({
    selector: 'dh2-admin-profile-list',
    templateUrl: './profile-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class ProfileListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.PROFILE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_profile.id', 'admin_profile.name'];
    displayedColumns = ['admin_profile.id', 'admin_profile.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

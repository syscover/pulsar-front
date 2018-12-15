import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './user.graphql';

@Component({
    selector: 'dh2-user-list',
    templateUrl: './user-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class UserListComponent extends CoreListComponent 
{
    objectTranslation = 'ADMIN.USER';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_user.id', 'admin_user.name', 'admin_user.surname', 'admin_user.email'];
    displayedColumns = ['admin_user.id', 'admin_user.name', 'admin_user.surname', 'admin_user.email', 'admin_user.active', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

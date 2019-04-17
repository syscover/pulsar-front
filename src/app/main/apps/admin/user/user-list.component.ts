import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './user.graphql';

@Component({
    selector: 'dh2-admin-user-list',
    templateUrl: './user-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class UserListComponent extends CoreListComponent 
{
    public objectTranslation = 'ADMIN.USER';
    public objectTranslationGender = 'M';
    public columnsSearch: string[] = ['admin_user.id', 'admin_user.name', 'admin_user.surname', 'admin_user.email'];
    public displayedColumns = ['admin_user.id', 'admin_user.name', 'admin_user.surname', 'admin_user.email', 'admin_user.active', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

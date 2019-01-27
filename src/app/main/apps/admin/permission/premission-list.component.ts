import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { Action, Permission } from '../admin.models';
import { graphQL } from './permission.graphql';

@Component({
    selector: 'dh2-admin-permission-list',
    templateUrl: './permission-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class PermissionListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.PERMISSION';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_resource.id', 'admin_resource.name', 'admin_package.name'];
    displayedColumns = ['admin_resource.id', 'admin_resource.name', 'admin_package.name', 'permissions'];
    permissions: Permission[] = [];
    actions: Action[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    // overwrite method to get statuses
    getCustomArgumentsGetRecords(args: Object): Object
    {
        args['sqlPermissions'] = [{
            command: 'where',
            column: 'admin_permission.profile_id',
            operator: '=',
            value: this.params['profile_id']
        }];

        return args;
    }

    setRelationsData(data: any): void
    {
        this.permissions = data.adminPermissions;
        this.actions = data.adminActions;
    }

    handleChangeAction($event, resourceId): void
    {
        console.log($event.value);
        console.log(this.params['profile_id']);
        console.log(resourceId);
    }
}

import { Component, Injector, QueryList, ViewChildren } from '@angular/core';
import { MatSelect } from '@angular/material';
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
    spinnerActive: string = null;

    @ViewChildren(MatSelect) selects: QueryList<MatSelect>;

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

    handleChangeAction($event, resourceId, actionId): void
    {
        // active spinner
        this.spinnerActive = resourceId + actionId;

        const ob$ = this.http
            .apolloClient()
            .mutate({
                mutation: this.graphQL.mutationUpdateObject,
                variables: {
                    profile_id: this.params['profile_id'],
                    resource_id: resourceId,
                    action_id: actionId,
                    checked: $event.target.parentElement.className.indexOf('mat-selected') === -1
                }
            })
            .subscribe(data => {
                ob$.unsubscribe();

                // deactivate spinner
                this.spinnerActive = undefined;
                this.snackBar.open(
                    this.translations['APPS.CHANGED_PERMISSIONS'],
                    this.translations['APPS.OK'],
                    {
                        verticalPosition: 'top',
                        duration        : 3000
                    }
                );
            });
    }
}

import { Component, Injector, QueryList, ViewChildren } from '@angular/core';
import { MatSelect } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { Action, Permission, Profile } from '../admin.models';
import { graphQL } from './permission.graphql';
import { ConfirmationDialogComponent } from '@horus/components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'dh2-admin-permission-list',
    templateUrl: './permission-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class PermissionListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.PERMISSION';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_resource.id', 'admin_resource.name', 'admin_package.name'];
    displayedColumns = ['admin_resource.id', 'admin_resource.name', 'admin_package.name', 'permissions'];
    permissions: Permission[] = [];
    actions: Action[] = [];
    profile: Profile = new Profile();
    spinnerActive: string = null;

    @ViewChildren(MatSelect) selects: QueryList<MatSelect>;

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    // overwrite method to get statuses
    getCustomArgumentsGetRecords(args: object): object
    {
        args['sqlPermissions'] = [{
            command: 'where',
            column: 'admin_permission.profile_id',
            operator: '=',
            value: this.params['profile_id']
        }];

        args['sqlProfile'] = [{
            command: 'where',
            column: 'admin_profile.id',
            operator: '=',
            value: this.params['profile_id']
        }];

        return args;
    }

    setRelationsData(data: any): void
    {
        this.permissions = data.adminPermissions;
        this.actions = data.adminActions;
        this.profile = data.adminProfile;
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

    handleAddAllPermission(): void
    {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: this.translateService.instant('ADMIN.ADD_ALL_PERMISSIONS_WARNING', {'profile': this.profile.name})
            }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result)
                {
                    // appear spinner in delete translate button
                    this.showSpinner = true;

                    const ob$ = this.http
                        .apolloClient()
                        .mutate({
                            mutation: this.graphQL.mutationAddAllPermissions,
                            variables: {
                                profile_id: this.params['profile_id']
                            }
                        })
                        .subscribe(data => {
                            ob$.unsubscribe();

                            // deactivate spinner
                            this.showSpinner = false;
                            this.snackBar.open(
                                this.translations['APPS.CHANGED_PERMISSIONS'],
                                this.translations['APPS.OK'],
                                {
                                    verticalPosition: 'top',
                                    duration        : 3000
                                }
                            );
                            this.initDataTable();
                        });
                }
            });
    }
}

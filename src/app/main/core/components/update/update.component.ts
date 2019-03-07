import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { UpdateService } from './update.service';
import { environment } from '../../../../../environments/environment';
import { ConfirmationDialogComponent } from '../confirmation-dialog.component';

@Component({
    selector: 'dh2-update',
    animations: fuseAnimations,
    template: `
        <button *ngIf="nVersions > 0"
                (click)="handleShowUpdates()"
                class="update-button"
                mat-button
                fxHide
                fxShow.gt-xs>
            <mat-icon [matBadge]="nVersions"
                      matBadgePosition="after"
                      matBadgeColor="warn"
                      matBadgeSize="medium">
                cloud_download
            </mat-icon>
        </button>
    `,
    styles: [`
        .update-button {
            min-width: 64px;
            height: 64px;    
        }
    `]
})

export class UpdateComponent implements OnInit
{
    public env: any = environment;
    public nVersions = 0;

    constructor(
        private _updateService: UpdateService,
        private _dialog: MatDialog,
        private _translateService: TranslateService
    ) { }

    ngOnInit(): void
    {
        const ob = this._updateService
            .checkUpdates()
            .subscribe(({data}: any) => {
                ob.unsubscribe();
                if (this.env.debug) console.log('DEBUG - response of adminCheckUpdates query: ', data);

                if (Array.isArray(data.adminCheckUpdates)) this.nVersions = data.adminCheckUpdates.length;
            });
    }

    handleShowUpdates(): void
    {
        const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
            data: {
                title: this._translateService.instant('UPDATE.UPDATES'),
                question: this._translateService.instant('UPDATE.PENDING_UPDATES')
            }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                if (result)
                {

                    console.log('Actualizar el sistema');
                    // appear spinner in delete translate button
                    // this.showSpinner = true;

                    // const ob$ = this.http
                    //                     //     .apolloClient()
                    //                     //     .mutate({
                    //                     //         mutation: this.graphQL.mutationAddAllPermissions,
                    //                     //         variables: {
                    //                     //             profile_id: this.params['profile_id']
                    //                     //         }
                    //                     //     })
                    //                     //     .subscribe(data => {
                    //                     //         ob$.unsubscribe();
                    //                     //
                    //                     //         // deactivate spinner
                    //                     //         this.showSpinner = false;
                    //                     //         this.snackBar.open(
                    //                     //             this.translations['APPS.CHANGED_PERMISSIONS'],
                    //                     //             this.translations['APPS.OK'],
                    //                     //             {
                    //                     //                 verticalPosition: 'top',
                    //                     //                 duration        : 3000
                    //                     //             }
                    //                     //         );
                    //                     //         this.initDataTable();
                    //                     //     });
                }
            });
    }
}

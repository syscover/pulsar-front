import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { UpdateService } from './update.service';
import { environment } from '../../../../../environments/environment';
import { UpdateDialogComponent } from './update-dialog.component';

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
    @Input('panel-version')
    public panelVersion: string;
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
            .checkUpdates(this.panelVersion)
            .subscribe(({data}: any) => {
                ob.unsubscribe();
                if (this.env.debug) console.log('DEBUG - response of adminCheckUpdates query: ', data);

                if (Array.isArray(data.adminCheckUpdates))
                {
                    this.nVersions = data.adminCheckUpdates.length;
                }
                else
                {
                    this.nVersions = 0;
                }
            });
    }

    handleShowUpdates(): void
    {
        const dialogRef = this._dialog.open(UpdateDialogComponent, {
            data: {
                title: this._translateService.instant('UPDATE.UPDATES'),
                question: this._translateService.instant('UPDATE.PENDING_UPDATES'),
                updating: this._translateService.instant('UPDATE.UPDATING'),
                updating_warning: this._translateService.instant('UPDATE.UPDATING_WARNING'),
                panelVersion: this.panelVersion
            }
        });

        dialogRef.afterClosed()
            .subscribe(result => {
                this.nVersions = result;
            });
    }
}

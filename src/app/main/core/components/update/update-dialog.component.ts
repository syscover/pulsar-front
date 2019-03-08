import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { UpdateService } from './update.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'dh2-update-dialog',
    template: `
        <h1 mat-dialog-title>
            <mat-icon>cloud_download</mat-icon> {{ title }}
        </h1>
        <div mat-dialog-content class="mb-20">
            <div *ngIf="!showProgressBar">
                <p>{{ question }}</p>
            </div>
            
            <div *ngIf="showProgressBar">
                <p>{{ updating }}</p>
                <mat-progress-bar
                        color="primary"
                        mode="indeterminate"
                        *ngIf="showProgressBar">
                </mat-progress-bar>
            </div>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="executeUpdates()" class="mat-accent mr-16" cdkFocusInitial>{{ ok }}</button>
            <button mat-raised-button [mat-dialog-close]="false">{{ cancel}}</button>
        </div>
    `
})
export class UpdateDialogComponent implements OnInit
{
    public title: string;
    public question: string;
    public ok: string;
    public cancel: string;
    public updating: string;
    public env: any = environment;
    public showProgressBar = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<UpdateDialogComponent>,
        private _updateService: UpdateService,
        private translateService: TranslateService
    ) 
    { }

    ngOnInit(): void
    {
        // load translations for component
        this.translateService.get('CONFIRM').subscribe(response => {
            this.title      = this.data.title ? this.data.title : response['TITLE'];
            this.question   = this.data.question ? this.data.question : response['QUESTION'];
            this.ok         = this.data.ok ? this.data.ok : response['OK'];
            this.cancel     = this.data.cancel ? this.data.cancel : response['CANCEL'];
            this.updating   = this.data.updating;
        });
    }

    executeUpdates(): void
    {
        // activate progress bar
        this.showProgressBar = true;

        const ob = this._updateService
            .executeUpdates()
            .subscribe(({data}: any) => {
                ob.unsubscribe();

                if (this.env.debug) console.log('DEBUG - response of adminExecuteUpdates query: ', data);

                if (Array.isArray(data.adminExecuteUpdates))
                {
                    this._dialogRef.close(data.adminExecuteUpdates.length);
                }
                else
                {
                    this._dialogRef.close(0);
                }
            });
    }
}

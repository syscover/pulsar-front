import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'dh2-order-row-info-dialog',
    template: `
        <h1 mat-dialog-title>{{ 'APPS.INFO' | translate }}</h1>
        <div mat-dialog-content>
            <div fxLayout="column" fxFlex>
                <div fxLayout="row" *ngFor="let info of infoData">
                    <strong>{{ info.trans }}:</strong> {{ info.value }}
                </div>
            </div>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button [mat-dialog-close]="true">{{ 'APPS.CLOSE' | translate }}</button>
        </div>
    `
})
export class OrderRowInfoDialogComponent implements OnInit
{
    infoData: any[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<OrderRowInfoDialogComponent>
    ) 
    {}

    ngOnInit(): void
    {
        this.infoData = Object.values(this.data.info);
        console.log(Object.values(this.data.info));
    }
}

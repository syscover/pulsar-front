import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'dh2-confirmation-dialog',
    template: `
        <h1 mat-dialog-title>Hir</h1>
        <div mat-dialog-content>
            <p>{{ data.question }}</p>
        </div>
        <div mat-dialog-actions>
            <button mat-raised-button (click)="onCancel()" cdkFocusInitial>Cancel</button>
            <button mat-raised-button (click)="onConfirm()">Borrar</button>
        </div>
    `
})
export class ConfirmationDialogComponent
{
    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) 
    { 
    }
  
    onCancel(): void 
    {
        this.dialogRef.close();
    }

    onConfirm(): void 
    {
        this.dialogRef.close();
    }
}

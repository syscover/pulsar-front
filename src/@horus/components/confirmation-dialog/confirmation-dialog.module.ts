import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';;

@NgModule({
    entryComponents: [
        ConfirmationDialogComponent
    ],
    declarations: [
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule
    ],
    exports: [
        ConfirmationDialogComponent
    ]
})
export class ConfirmationDialogModule { }

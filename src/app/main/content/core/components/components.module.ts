import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { AttachmentsModule } from './attachments/attachments.module';
import { ImageInputModule } from './image-input/image-input.module';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { FlagIconComponent } from './flag-icon.component';

@NgModule({
    imports: [
        AttachmentsModule,
        CommonModule,
        ImageInputModule,
        MatDialogModule
    ],
    exports: [
        AttachmentsModule,
        ImageInputModule,
        ConfirmationDialogComponent,
        FlagIconComponent
    ],
    declarations: [
        ConfirmationDialogComponent,
        FlagIconComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ]
})
export class ComponentsModule
{
}

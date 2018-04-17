import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { AttachmentsModule } from './attachments/attachments.module';
import { ImageInputModule } from './image-input/image-input.module';
import { FroalaModule } from './froala/froala.module';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { FlagIconComponent } from './flag-icon.component';

@NgModule({
    imports: [
        AttachmentsModule,
        CommonModule,
        FroalaModule,
        ImageInputModule,
        MatButtonModule,
        MatDialogModule
    ],
    exports: [
        AttachmentsModule,
        FroalaModule,
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

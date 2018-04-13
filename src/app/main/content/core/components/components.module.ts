import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { AttachmentsModule } from './attachments/attachments.module';
import { ImageInputModule } from './image-input/image-input.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { FlagIconComponent } from './flag-icon.component';
import { FroalaComponent } from './froala.component';

import 'froala-editor/js/froala_editor.pkgd.min.js';

@NgModule({
    imports: [
        AttachmentsModule,
        CommonModule,
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot(),
        ImageInputModule,
        MatButtonModule,
        MatDialogModule
    ],
    exports: [
        AttachmentsModule,
        ImageInputModule,
        ConfirmationDialogComponent,
        FlagIconComponent,
        FroalaComponent
    ],
    declarations: [
        ConfirmationDialogComponent,
        FlagIconComponent,
        FroalaComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ]
})
export class ComponentsModule
{
}

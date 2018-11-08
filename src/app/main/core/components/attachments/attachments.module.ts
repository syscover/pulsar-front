import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { PipesModule } from './../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { DragulaModule } from 'ng2-dragula';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ImageInputModule } from './../image-input/image-input.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { AttachmentItemComponent } from './attachment-item/attachment-item.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { CropperDialogComponent } from './cropper-dialog.component';

import { AttachmentsService } from './attachments.service';

@NgModule({
    imports: [
        CommonModule,
        DragulaModule.forRoot(),
        FormsModule,
        ImageInputModule,
        MatButtonModule,
        MatDialogModule,
        PipesModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        AttachmentsComponent
    ],
    declarations: [
        AttachmentItemComponent,
        AttachmentsComponent,
        CropperDialogComponent
    ],
    providers: [
        AttachmentsService
    ],
    entryComponents: [
        CropperDialogComponent   
    ]
})
export class AttachmentsModule
{ 
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}

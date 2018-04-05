import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from './../../../../../@fuse/shared.module';
import { MaterialModule } from './material.module';

import { SlugDirective } from './../directives/slug.directive';

import { AttachmentItemComponent } from './../components/attachments/attachment-item/attachment-item.component';
import { AttachmentsComponent } from './../components/attachments/attachments/attachments.component';
import { ConfirmationDialogComponent } from './../components/confirmation-dialog.component';
import { FlagIconComponent } from './../components/flag-icon.component';
import { ImageInputComponent } from './../components/image-input.component';

import { ActionTranslationObjectPipe } from './../pipes/action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from './../pipes/check-translation-object.pipe';
import { CollectionObjectValuePipe } from './../pipes/collection-object-value.pipe';
import { FormatSizePipe } from './../pipes/format-size.pipe';

import { AttachmentsService } from './../components/attachments/attachments.service';

@NgModule({
    declarations: [
        SlugDirective,
        AttachmentsComponent,
        AttachmentItemComponent,
        ConfirmationDialogComponent,
        FlagIconComponent,
        ImageInputComponent,
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe,
        FormatSizePipe,
    ],
    providers: [
        AttachmentsService
    ],
    imports: [
        FuseSharedModule,
        TranslateModule,
        MaterialModule
    ],
    exports: [
        FuseSharedModule,
        TranslateModule,
        MaterialModule,
        SlugDirective,
        AttachmentItemComponent,
        AttachmentsComponent,
        FlagIconComponent,
        ImageInputComponent,
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe,
        FormatSizePipe,
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ],
})
export class SharedModule
{ 
}

import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AttachmentItemComponent } from './attachment-item/attachment-item.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { AttachmentsService } from './attachments.service';

@NgModule({
    declarations: [
        AttachmentItemComponent,
        AttachmentsComponent
    ],
    providers: [
        AttachmentsService
    ],
    imports: [
    ],
    exports: [
        AttachmentItemComponent,
        AttachmentsComponent
    ],
    entryComponents: [     
    ],
})
export class AttachmentsModule
{ }

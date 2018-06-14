import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { AttachmentsModule } from './attachments/attachments.module';
import { ImageInputModule } from './image-input/image-input.module';
import { FroalaModule } from './froala/froala.module';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { FlagIconComponent } from './flag-icon.component';
import { SearchListComponent } from './search-list.component';

@NgModule({
    imports: [
        AttachmentsModule,
        CommonModule,
        FroalaModule,
        ImageInputModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule
    ],
    exports: [
        AttachmentsModule,
        ConfirmationDialogComponent,
        FlagIconComponent,
        FroalaModule,
        ImageInputModule,
        SearchListComponent
    ],
    declarations: [
        ConfirmationDialogComponent,
        FlagIconComponent,
        SearchListComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ]
})
export class ComponentsModule
{
}

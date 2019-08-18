import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorComponent } from '@horus/components/ckeditor/ckeditor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorService } from '@horus/components/ckeditor/ckeditor.service';

@NgModule({
    declarations: [
        CKEditorComponent
    ],
    providers: [
        CKEditorService
    ],
    imports: [
        CommonModule,
        CKEditorModule,
        FormsModule
    ],
    exports: [
        CKEditorComponent,
        CKEditorModule
    ]
})
export class WysiwygCKEditorModule 
{}

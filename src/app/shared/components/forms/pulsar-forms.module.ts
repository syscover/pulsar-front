import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './../../modules/prime-ng.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

import { ButtonComponent } from './button.component';
import { AutocompleteComponent } from './autocomplete.component';
import { CheckboxComponent } from './checkbox.component';
import { DropdownComponent } from './dropdown.component';
import { EditorComponent } from './editor.component';
import { InputComponent } from './input.component';
import { LangLabelComponent } from './lang-label.component';
import { MultiSelectComponent } from './multi-select.component';
import { SpinnerComponent } from './spinner.component';
import { TextareaComponent } from './textarea.component';
import { AttachmentFilesLibraryComponent } from './attachment-files-library/attachment-files-library/attachment-files-library.component';
import { AttachmentItemComponent } from './attachment-files-library/attachment-item/attachment-item.component';
import { ImageComponent } from './image.component';

@NgModule({
    declarations: [
        AutocompleteComponent,
        ButtonComponent,
        CheckboxComponent,
        DropdownComponent,
        EditorComponent,
        InputComponent,
        LangLabelComponent,
        MultiSelectComponent,
        SpinnerComponent,
        TextareaComponent,
        AttachmentFilesLibraryComponent,
        AttachmentItemComponent,
        ImageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNgModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    exports: [
        AutocompleteComponent,
        ButtonComponent,
        CheckboxComponent,
        DropdownComponent,
        EditorComponent,
        FroalaEditorModule,
        FroalaViewModule,
        InputComponent,
        LangLabelComponent,
        MultiSelectComponent,
        SpinnerComponent,
        TextareaComponent,
        AttachmentFilesLibraryComponent,
        AttachmentItemComponent,
        ImageComponent
    ],
    providers: [],
})

export class PulsarFormsModule { }

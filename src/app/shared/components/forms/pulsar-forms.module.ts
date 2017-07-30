import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './../../modules/prime-ng.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { ChipsComponent } from './chips.component';
import { CalendarComponent } from './calendar.component';
import { AutocompleteComponent } from './autocomplete.component';
import { CheckboxComponent } from './checkbox.component';
import { DropdownComponent } from './dropdown.component';
import { EditorComponent } from './editor.component';
import { InputComponent } from './input.component';
import { LangLabelComponent } from './lang-label.component';
import { MessagesComponent } from './messages.component';
import { MultiSelectComponent } from './multi-select.component';
import { SpinnerComponent } from './spinner.component';
import { TextareaComponent } from './textarea.component';
import { AttachmentFilesLibraryComponent } from './attachment-files-library/attachment-files-library/attachment-files-library.component';
import { AttachmentItemComponent } from './attachment-files-library/attachment-item/attachment-item.component';
import { ImageComponent } from './image.component';
import { SortableDirective } from './sortable.directive';
import { ButtonComponent } from './button.component';
import { FormatSizePipe } from '../../pipes/format-size.pipe';

@NgModule({
    declarations: [
        ChipsComponent,
        CalendarComponent,
        AutocompleteComponent,
        ButtonComponent,
        CheckboxComponent,
        DropdownComponent,
        EditorComponent,
        InputComponent,
        LangLabelComponent,
        MessagesComponent,
        MultiSelectComponent,
        SpinnerComponent,
        TextareaComponent,
        AttachmentFilesLibraryComponent,
        AttachmentItemComponent,
        ImageComponent,
        SortableDirective,
        FormatSizePipe
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
        ChipsComponent,
        CalendarComponent,
        AutocompleteComponent,
        ButtonComponent,
        CheckboxComponent,
        DropdownComponent,
        EditorComponent,
        FroalaEditorModule,
        FroalaViewModule,
        InputComponent,
        LangLabelComponent,
        MessagesComponent,
        MultiSelectComponent,
        SpinnerComponent,
        TextareaComponent,
        AttachmentFilesLibraryComponent,
        AttachmentItemComponent,
        ImageComponent,
        SortableDirective,
        FormatSizePipe
    ],
    providers: [
    ],
})

export class PulsarFormsModule { }

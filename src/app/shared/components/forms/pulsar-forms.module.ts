import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
        TextareaComponent
    ],
    imports: [
        CommonModule,
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
        TextareaComponent
    ],
    providers: [],
})

export class PulsarFormsModule { }

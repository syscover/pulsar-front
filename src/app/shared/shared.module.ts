import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PrimeNgModule } from './modules/prime-ng.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { DataContainerComponent } from './components/data-container/data-container.component';
import { CheckLangsObjectPipe } from './pipes/check-langs-object.pipe';
import { ActionLangObjectPipe } from './pipes/action-lang-object.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenuComponent, SubMenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/errors/error.component';
import { DatatableSearchComponent } from './components/datatable-search/datatable-search.component';
import { DatatableHeaderComponent } from './components/datatable-header/datatable-header.component';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { InputComponent } from './components/forms/input.component';
import { EditorComponent } from './components/forms/editor.component';
import { SpinnerComponent } from './components/forms/spinner.component';
import { DropdownComponent } from './components/forms/dropdown.component';
import { AutocompleteComponent } from './components/forms/autocomplete.component';
import { MultiSelectComponent } from './components/forms/multi-select.component';
import { CheckboxComponent } from './components/forms/checkbox.component';
import { TextareaComponent } from './components/forms/textarea.component';
import { ButtonComponent } from './components/forms/button.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNgModule,
        ConfirmDialogModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    declarations: [
        MainLayoutComponent,
        DataContainerComponent,
        TopbarComponent,
        CheckLangsObjectPipe,
        ActionLangObjectPipe,
        MenuComponent,
        SubMenuComponent,
        ProfileComponent,
        FooterComponent,
        ErrorComponent,
        DatatableSearchComponent,
        DatatableHeaderComponent,
        FormHeaderComponent,
        InputComponent,
        EditorComponent,
        SpinnerComponent,
        DropdownComponent,
        AutocompleteComponent,
        MultiSelectComponent,
        CheckboxComponent,
        TextareaComponent,
        ButtonComponent
    ],
    providers: [
        ConfirmationService
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNgModule,
        ConfirmDialogModule,
        FroalaEditorModule,
        FroalaViewModule,
        MainLayoutComponent,
        ErrorComponent,
        DataContainerComponent,
        DatatableSearchComponent,
        DatatableHeaderComponent,
        FormHeaderComponent,
        InputComponent,
        EditorComponent,
        SpinnerComponent,
        DropdownComponent,
        AutocompleteComponent,
        MultiSelectComponent,
        CheckboxComponent,
        TextareaComponent,
        ButtonComponent,
        CheckLangsObjectPipe,
        ActionLangObjectPipe
    ]
})

export class SharedModule { }

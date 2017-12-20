import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimeNgModule } from './modules/prime-ng.module';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { PulsarFormsModule } from './components/forms/pulsar-forms.module';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { DataContainerComponent } from './components/data-container/data-container.component';
import { CheckLangsObjectPipe } from './pipes/check-langs-object.pipe';
import { ActionLangObjectPipe } from './pipes/action-lang-object.pipe';
import { ErrorComponent } from './components/errors/error.component';
import { DatatableSearchComponent } from './components/datatable-search/datatable-search.component';
import { DatatableHeaderComponent } from './components/datatable-header/datatable-header.component';
import { DynamicFormComponent } from './components/forms/dynamic-form/dynamic-form.component';
import { DynamicFormService } from './components/forms/dynamic-form/dynamic-form.service';
import { AttachmentService } from './components/forms/attachment-files-library/attachment.service';
import { GetLangValuePipe } from './pipes/get-lang-value.pipe';
import { GetObjectValuePipe } from './pipes/get-object-value.pipe';
import { NumberArrayPipe } from './pipes/number-array.pipe';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        PulsarFormsModule,
        ReactiveFormsModule,
        PrimeNgModule,
        ConfirmDialogModule
    ],
    declarations: [
        ActionLangObjectPipe,
        CheckLangsObjectPipe,
        DataContainerComponent,
        DatatableHeaderComponent,
        DatatableSearchComponent,
        DynamicFormComponent,
        ErrorComponent,
        GetObjectValuePipe,
        GetLangValuePipe,
        NumberArrayPipe,
        ProgressSpinnerComponent,
    ],
    providers: [
        ConfirmationService,
        DynamicFormService,
        AttachmentService,
    ],
    exports: [
        CommonModule,
        FormsModule,
        PulsarFormsModule,
        ReactiveFormsModule,
        PrimeNgModule,
        ConfirmDialogModule,
        ErrorComponent,
        DataContainerComponent,
        DatatableSearchComponent,
        DatatableHeaderComponent,
        ProgressSpinnerComponent,
        DynamicFormComponent,
        ActionLangObjectPipe,
        CheckLangsObjectPipe,
        GetObjectValuePipe,
        GetLangValuePipe,
        NumberArrayPipe,
    ]
})

export class SharedModule { }

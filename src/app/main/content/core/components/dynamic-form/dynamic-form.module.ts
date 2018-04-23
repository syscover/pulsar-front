import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    // MatAutocompleteModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    MatCheckboxModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatCardModule,
    // MatChipsModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatExpansionModule,
    MatFormFieldModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    MatRadioModule,
    // MatRippleModule,
    MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatStepperModule,
    // DateAdapter
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { FroalaModule } from './../froala/froala.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormService } from './dynamic-form.service';
import { FieldGraphQLService } from './../../../apps/admin/field/field-graphql.service';

import { GetFieldLabelPipe } from './pipes/get-field-label.pipe';
import { GetSelectValuesPipe } from './pipes/get-select-values.pipe';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FroalaModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslateModule.forChild()
    ],
    exports: [
        DynamicFormComponent,
    ],
    declarations: [
        GetFieldLabelPipe,
        GetSelectValuesPipe,
        DynamicFormComponent
    ],
    providers: [
        DynamicFormService,
        FieldGraphQLService
    ],
})
export class DynamicFormModule
{
}

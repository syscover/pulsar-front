import { GetFeildLabelPipe } from './get-field-label.pipe';
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
    // MatIconModule,
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
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormService } from './dynamic-form.service';
import { FieldGraphQLService } from './../../../apps/admin/field/field-graphql.service';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [
        DynamicFormComponent,
    ],
    declarations: [
        GetFeildLabelPipe,
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

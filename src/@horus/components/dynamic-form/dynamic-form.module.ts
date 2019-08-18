import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DatepickerModule} from '@horus/components/datepicker/datepicker.module';
import { WysiwygCKEditorModule } from './../ckeditor/ckeditor.module';
import { DynamicFormComponent } from '@horus/components/dynamic-form/dynamic-form.component';
import { DynamicFormService } from '@horus/components/dynamic-form/dynamic-form.service';

import { GetFieldLabelPipe } from '@horus/components/dynamic-form//pipes/get-field-label.pipe';
import { GetSelectValuesPipe } from '@horus/components/dynamic-form/pipes/get-select-values.pipe';

@NgModule({
    imports: [
        CommonModule,
        DatepickerModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        WysiwygCKEditorModule
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
        DynamicFormService
    ],
})
export class DynamicFormModule {}

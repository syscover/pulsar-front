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
import { FroalaModule } from './../froala/froala.module';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormService } from './dynamic-form.service';

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
        DynamicFormService
    ],
})
export class DynamicFormModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@horus/components/datepicker/datepicker.component';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
} from '@angular/material';

@NgModule({
    declarations: [
        DatePickerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [
        DatePickerComponent
    ]
})
export class DatepickerModule {}

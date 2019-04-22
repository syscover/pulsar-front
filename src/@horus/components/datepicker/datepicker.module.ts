import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerComponent } from '@horus/components/datepicker/datepicker.component';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
} from '@angular/material';

@NgModule({
    declarations: [
        DatepickerComponent
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
        DatepickerComponent
    ]
})
export class DatepickerModule {}

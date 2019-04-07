import { NgModule } from '@angular/core';
import { DatePickerComponent } from './datepicker.component';
import { MatDatepickerModule, MatInputModule } from '@angular/material';

@NgModule({
    declarations: [
        DatePickerComponent
    ],
    imports: [
        MatDatepickerModule,
        MatInputModule
    ],
    exports: [
        DatePickerComponent
    ]
})
export class DatepickerModule
{
}

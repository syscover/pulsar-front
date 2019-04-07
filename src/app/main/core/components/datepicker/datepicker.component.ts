import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
const moment = require('moment');

@Component({
    selector: 'dh2-datepicker',
    template: `
        <mat-form-field>
            <mat-label>{{ label }}</mat-label>
            <input matInput 
                   [required]="required"
                   [matDatepicker]="picker" 
                   [value]="dateValue" 
                   (dateInput)="addEvent('input', $event)">
            <mat-datepicker-toggle matSuffix 
                                   [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ]
})
export class DatePickerComponent implements ControlValueAccessor
{
    @Input() format = 'YYYY-MM-DD HH:mm:ss';
    @Input() label: string;
    @Input() required = false;
    @Input() _dateValue;
    @Input() formControlName: string;

    get dateValue(): string
    {
        return moment(this._dateValue, this.format);
    }

    set dateValue(val)
    {
        if (moment(val).isValid())
        {
            this._dateValue = moment(val).format(this.format);
        }
        else {
            this._dateValue = '';
        }
        this.propagateChange(this._dateValue);
    }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>): void
    {
        this.dateValue = moment(event.value, this.format);
    }

    // writes a new value to the element.
    writeValue(value: any): void
    {
        this.dateValue = moment(value, this.format);
    }

    propagateChange = (_: any) => { };

    // Registers a callback function is called by the forms API on initialization
    // to update the form model on blur.
    registerOnChange(fn): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(): void { }
}

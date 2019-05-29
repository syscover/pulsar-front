import { Component, Input, Optional, Self, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ErrorStateMatcher, MatFormFieldControl, MatInput } from '@angular/material';
import * as moment from 'moment';

@Component({
    selector: 'hr-datepicker',
    template: `
        <mat-form-field [class]="class" [appearance]="appearance">
            <mat-label>{{ label }}</mat-label>
            <input matInput
                   #input
                   [formControl]="control"
                   [required]="required"
                   [matDatepicker]="picker" 
                   [value]="value"
                   (dateInput)="handleInput('input', $event)">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error>{{ errors[controlName] }}</mat-error>
        </mat-form-field>
    `,
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: DatepickerComponent
        }
    ],
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {

    @Input() appearance: string = 'standard'; // 'legacy' | 'standard' | 'fill' | 'outline'
    @Input() format = 'YYYY-MM-DD HH:mm:ss';
    @Input() label: string;
    @Input() class: string;
    @Input() required = false;
    @Input() debug = false;
    @Input() errors: object = {};

    @Input()
    get value(): moment.Moment {

        if (moment(this._value, this.format).isValid()) {

            return moment(this._value, this.format);

        }
        else {

            return null;

        }

    }
    set value(value)
    {
        if (this.debug) console.log('DEBUG - hr-datepicker set value: ' + value);

        if (moment(value).isValid())
        {
            this._value = moment(value).format(this.format);
        }
        else
        {
            this._value = '';
        }
        this.propagateChange(this._value);
    }

    @Input()
    get errorStateMatcher(): ErrorStateMatcher
    {
        return this.input.errorStateMatcher;
    }
    set errorStateMatcher(value)
    {
        this.input.errorStateMatcher = value;
    }
    @Input()
    get placeholder(): string
    {
        return this.input.placeholder;
    }
    set placeholder(plh)
    {
        this.input.placeholder = plh;
    }

    @ViewChild('input')
    input: MatInput;

    controlName: string;
    control: FormControl;
    propagateChange = (_: any) => { };
    private _value: string;

    constructor(
        @Optional() @Self() private _ngControl: NgControl,
        @Optional() private _controlName: FormControlName
    )
    {
        if (_ngControl) _ngControl.valueAccessor = this;
    }

    ngOnInit(): void
    {
        this.control = this._controlName.control;
        this.controlName = this._controlName.name;
    }

    handleInput(type: string, event: MatDatepickerInputEvent<Date>): void
    {
        if (this.debug) console.log('DEBUG - hr-datepicker with name: ' + this._ngControl.name + ' change with value: ', event.value);
        this.value = moment(event.value, this.format);
    }

    // initialise the value.
    writeValue(value: any): void
    {
        if (this.debug) console.log('DEBUG - hr-datepicker with name: ' + this._ngControl.name + ' init value: ', value);
        if (moment(value).isValid())
        {
            this.value = moment(value, this.format);
        }
        else
        {
            this.value = null;
        }
    }

    // Registers a callback function is called by the forms API on initialization
    // to update the form model on blur.
    registerOnChange(fn): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(): void { }
}

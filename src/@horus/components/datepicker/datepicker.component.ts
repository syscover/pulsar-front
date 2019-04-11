import {Component, Input, forwardRef, Optional, Self, OnInit, DoCheck, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormControl, FormControlName, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {ErrorStateMatcher, MatFormFieldControl, MatInput, MatSelect} from '@angular/material';
const moment = require('moment');

@Component({
    selector: 'dh2-datepicker',
    template: `
        <mat-form-field>
            <mat-label>{{ label }}</mat-label>
            <input matInput
                   #input
                   [formControl]="control"
                   [required]="required"
                   [matDatepicker]="picker" 
                   [value]="value"
                   (dateInput)="handleInput('input', $event)">
            <mat-datepicker-toggle matSuffix 
                                   [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error>{{ errors[controlName] }}</mat-error>
        </mat-form-field>
    `,
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: DatePickerComponent
        }
    ],
})
export class DatePickerComponent implements ControlValueAccessor, OnInit
{
    @Input() format = 'YYYY-MM-DD HH:mm:ss';
    @Input() label: string;
    @Input() required = false;
    @Input() errors: object = {};
    controlName: String;

    ngControl: NgControl;


    @Input()
    get errorStateMatcher(): ErrorStateMatcher {
        return this.input.errorStateMatcher;
    }
    set errorStateMatcher(val) {
        this.input.errorStateMatcher = val;
    }

    @Input()
    get placeholder(): string {
        return this.input.placeholder;
    }
    set placeholder(plh) {
        this.input.placeholder = plh;
    }

    get errorState() {
        return this.ngControl.errors !== null && !!this.ngControl.touched;
    }

    get value(): string { return moment(this._value, this.format); }
    set value(val) {
        if (moment(val).isValid()) {
            this._value = moment(val).format(this.format);
        }
        else {
            this._value = '';
        }
        this.propagateChange(this._value);
    }
    @Input() _value;

    @ViewChild('input')
    input: MatInput;

    control: FormControl;

    constructor(
        @Optional() @Self() ngControl: NgControl,
        @Optional() private _controlName: FormControlName) {
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        this.control = this._controlName.control;
        this.controlName = this._controlName.name;
    }

    handleInput(type: string, event: MatDatepickerInputEvent<Date>): void {
        this.value = moment(event.value, this.format);
    }

    // initialise the value.
    writeValue(value: any): void {
        this.value = moment(value, this.format);
    }



    propagateChange = (_: any) => { };

    // Registers a callback function is called by the forms API on initialization
    // to update the form model on blur.
    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void { }
}

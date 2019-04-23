import { Component, Input, Optional, Self, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, NgControl } from '@angular/forms';
import { ErrorStateMatcher, MatFormFieldControl, MatInput } from '@angular/material';
import { MatFormFieldAppearance } from '@angular/material/typings/form-field';

@Component({
    selector: 'hr-input',
    template: `
        <mat-form-field [appearance]="appearance" 
                        [class]="class">
            <mat-label>{{ label }}</mat-label>
            <input #input 
                   matInput
                   [formControl]="control"
                   [required]="required">
            <mat-error>{{ error }}</mat-error>
        </mat-form-field>
    `,
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: InputComponent
        }
    ],
})
export class InputComponent implements ControlValueAccessor, OnInit
{
    @Input() appearance: MatFormFieldAppearance;
    @Input() class: string;
    @Input() label: string;
    @Input() required = false;
    @Input() debug = false;
    @Input() error: string;
    @ViewChild('input') input: MatInput;

    controlName: string;
    control: FormControl;
    private _value: string | number;
    propagateChange = (_: any) => { };

    @Input()
    get value(): string | number
    {
        return this._value;
    }
    set value(value)
    {
        if (this.debug) console.log('DEBUG - hr-input set value: ' + value);
        this._value = value;
        this.propagateChange(this._value);
    }

    @Input()
    get errorStateMatcher(): ErrorStateMatcher
    {
        console.log(this.input.errorStateMatcher);

        return this.input.errorStateMatcher;
    }
    set errorStateMatcher(value)
    {
        console.log(value);
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

    // initialise the value.
    writeValue(value: any): void
    {
        if (this.debug) console.log('DEBUG - hr-input with name: ' + this._ngControl.name + ' init value: ', value);
        this.value = value;
    }

    // Registers a callback function is called by the forms API on initialization
    // to update the form model on blur.
    registerOnChange(fn): void
    {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {}

    setDisabledState(isDisabled: boolean): void {
        if (this.debug) console.log('DEBUG - hr-input setDisabledState: ', isDisabled);
    }
}

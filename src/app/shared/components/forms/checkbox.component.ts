import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-checkbox',
    template: `
        <div [formGroup]="form">
            <p-checkbox 
                [formControlName]="name"
                [label]="label" 
                binary="true"
                (onChange)="handleChange($event)">
            </p-checkbox>
        <div>
    `,
    styles: [`
        :host{
            margin-bottom: 40px;
        }
        .ui-messages-error {
            position: absolute;
        }
        input.ng-dirty.ng-invalid {
            border-bottom-color: #e62a10; 
        }`]
})
export class CheckboxComponent implements OnInit {

    @Input() private form: FormGroup;
    @Input() private label: string;
    @Input() private name: string;

    private formControl: AbstractControl;
    private error: string;

    constructor() { }

    ngOnInit() {
        this.formControl = this.form.controls[this.name];

        // Error validation
        this.form
            .controls[this.name]
            .valueChanges
            .subscribe(data => this.error = onValueChangedFormControl(this.formControl, data));

        if (this.formControl.value === null || this.formControl.value === undefined || this.formControl.value === '') {
            this.formControl.setValue(false);
        }
    }

    handleChange($event) {
        this.formControl.setValue($event); //
    }

}

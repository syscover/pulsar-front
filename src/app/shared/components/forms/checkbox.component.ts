import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { onValueChangedFormControl } from './../../super/core-validation';
import { ValidationMessageService } from './../../../core/services/validation-message.service';

@Component({
    selector: 'ps-checkbox',
    template: `
        <div [formGroup]="form">
            <p-checkbox 
                [formControlName]="name" 
                [label]="label" 
                binary="true">
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

    constructor(
        private validationMessageService: ValidationMessageService
    ) { }

    ngOnInit() {
        this.formControl = this.form.controls[this.name];
        this.form
            .controls[this.name]
            .valueChanges
            .subscribe(data => this.error = onValueChangedFormControl(this.formControl, this.validationMessageService, data));
    }

}

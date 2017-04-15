import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { onValueChangedFormControl } from './../../super/core-validation';
import { ValidationMessageService } from './../../../core/services/validation-message.service';

@Component({
    selector: 'ps-input',
    template: `
        <div [formGroup]="form">
            <span class="md-inputfield">
                <input  [formControlName]="name"
                        type="{{ type }}"
                        pInputText>
                <label>{{ label }}</label>
                <div *ngIf="error" class="ui-message ui-messages-error ui-corner-all">
                    {{ error }}
                </div>
            </span>
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
export class InputComponent implements OnInit {

    @Input() private form: FormGroup;
    @Input() private type: string;
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

    @Input()
    set errors(errors: Object){
        if (this.name && errors && errors[this.name]) {
            this.error = errors[this.name];
        }
    }

}

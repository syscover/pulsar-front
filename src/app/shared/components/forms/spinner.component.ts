import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-spinner',
    template: `
        <div [formGroup]="form">
            <span class="md-inputfield">
                <p-spinner  [formControlName]="name"
                            [min]="min"
                            [max]="max"
                            [step]="step"
                            (onChange)="handleChange($event)">
                            </p-spinner>
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
export class SpinnerComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() label: string;
    @Input() name: string;
    @Input() min: number;
    @Input() max: number;
    @Input() step: number = 1;

    formControl: AbstractControl;
    error: string;

    @Output() private onChange = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        this.formControl = this.form.controls[this.name];

        // Error validation
        this.form
            .controls[this.name]
            .valueChanges
            .subscribe(data => this.error = onValueChangedFormControl(this.formControl, data));
    }

    @Input()
    set errors(errors: Object){
        if (this.name && errors && errors[this.name]) {
            this.error = errors[this.name];
        }
    }

    handleChange($event) {
        this.onChange.emit($event);
    }
}

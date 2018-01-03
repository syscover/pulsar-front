import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { onValueChangedFormControl } from './../../../core/super/core-validation';

@Component({
    selector: 'ps-input',
    template: `
        <div [formGroup]="form">
            <span class="md-inputfield">
                <input  [formControlName]="name"
                        [type]="type"
                        (change)="handleChange($event)"
                        (blur)="handleBlur($event)"
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

    @Input() form: FormGroup;
    @Input() type: string = 'text';
    @Input() label: string;
    @Input() name: string;

    @Output() change = new EventEmitter<any>();
    @Output() blur = new EventEmitter<any>();

    formControl: AbstractControl;
    error: string;

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
        this.change.emit($event);
    }

    handleBlur($event) {
        this.blur.emit($event);
    }
}

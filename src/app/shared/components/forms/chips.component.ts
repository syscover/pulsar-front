import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { onValueChangedFormControl } from './../../../core/super/core-validation';

@Component({
    selector: 'ps-chips',
    template: `
        <div [formGroup]="form">
            <p-chips  [formControlName]="name"
                      [placeholder]="label">
            </p-chips>
            <div *ngIf="error" class="ui-dropdown-message ui-message ui-messages-error ui-corner-all">
                {{ error }}
            </div>
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
export class ChipsComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() name: string;
    @Input() label: string;

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

}

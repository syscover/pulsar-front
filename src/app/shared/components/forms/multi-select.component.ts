import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-multi-select',
    template: `
        <div [formGroup]="form">
            <p-multiSelect  [formControlName]="name"
                            [defaultLabel]="label"
                            [options]="options">
            </p-multiSelect>
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
export class MultiSelectComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() options: SelectItem[] = [];
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

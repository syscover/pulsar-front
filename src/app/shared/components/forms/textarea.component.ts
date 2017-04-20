import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-textarea',
    template: `
        <div [formGroup]="form">
            <span class="md-inputfield">        
                <h1 *ngIf="label">{{ label }}</h1>
                <textarea   [formControlName]="name" 
                            [rows]="rows" 
                            [cols]="cols" 
                            [placeholder]="placeholder"
                            pInputTextarea autoResize="autoResize">
                </textarea>
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
export class TextareaComponent implements OnInit {

    @Input() private form: FormGroup;
    @Input() private rows: number;
    @Input() private cols: number;
    @Input() private label: string;
    @Input() private placeholder: string = '';
    @Input() private name: string;

    private formControl: AbstractControl;
    private error: string;

    constructor() { }

    ngOnInit() {
        this.formControl = this.form.controls[this.name];
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

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-dropdown',
    template: `
        <div [formGroup]="form">
            <p-dropdown [formControlName]="name" 
                        [options]="options" 
                        [autoWidth]="autoWidth"
                        (onChange)="handleChange($event)">
                        </p-dropdown>
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
export class DropdownComponent implements OnInit {

    @Input() private form: FormGroup;
    @Input() private options: SelectItem[] = [];
    @Input() private name: string;
    @Input() private autoWidth: boolean;

    private formControl: AbstractControl;
    private error: string;

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

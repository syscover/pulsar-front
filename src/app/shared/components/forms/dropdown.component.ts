import { Component, Input, Output, OnInit, AfterContentInit, EventEmitter, ViewChild, ContentChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { SelectItem, Dropdown, PrimeTemplate } from 'primeng/primeng';

import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-dropdown',
    template: `
        <div [formGroup]="form">
            <p-dropdown [formControlName]="name" 
                        [options]="options" 
                        [autoWidth]="autoWidth"
                        [filter]=filter
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
export class DropdownComponent implements OnInit, AfterContentInit {

    @Input() form: FormGroup;
    @Input() options: SelectItem[] = [];
    @Input() name: string;
    @Input() autoWidth: boolean;
    @Input() filter: string;

    @ViewChild(Dropdown) pDropdown: Dropdown;
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

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

    ngAfterContentInit() {
        this.pDropdown.templates = this.templates; // set custom tamplates in dropdown
        this.pDropdown.ngAfterContentInit();
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

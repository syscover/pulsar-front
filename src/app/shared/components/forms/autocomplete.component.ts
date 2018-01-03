import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

import { onValueChangedFormControl } from './../../../core/super/core-validation';

@Component({
    selector: 'ps-autocomplete',
    template: `
        <div [formGroup]="form">
            <p-autoComplete #autoComplete
                            [formControlName]="name"
                            [suggestions]="filteredRecords"
                            [field]="field"
                            dataKey="value"
                            inputId="value"
                            [placeholder]="placeholder"
                            (completeMethod)="filterRecords($event)"
                            (onDropdownClick)="handleDropdown($event)"
                            (onSelect)="handleSelect($event)"
                            [dropdown]="true"
                            [minLength]="1"
                            [multiple]="multiple"
                            values=ES
                            [autoHighlight]=true></p-autoComplete>
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
export class AutocompleteComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() name: string;
    @Input() key: string;
    @Input() field: string;
    @Input() options: any[];
    @Input() placeholder: string;
    @Input() multiple: boolean = false;

    @ViewChild('autoComplete') private autoComplete;

    formControl: AbstractControl;
    error: string;
    filteredRecords: any[];   // suggestion to autocomplete

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

    filterRecords(event) {
        this.filteredRecords = [];
        for (const object of this.options) {
            if (object[this.field].toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
                this.filteredRecords.push(object);
            }
        }
    }

    handleDropdown(event) {
        this.filteredRecords = [];
        this.filteredRecords = this.options;

        event.originalEvent.preventDefault();
        event.originalEvent.stopPropagation();

        if (this.autoComplete.panelVisible) {
            this.autoComplete.onDropdownBlur();
            this.autoComplete.hide();
        } else {
            this.autoComplete.onDropdownFocus();
            this.autoComplete.show();
        }
    }

    handleSelect(event) {
        this.formControl.setValue(event[this.key], { emitModelToViewChange: false });
    }
}

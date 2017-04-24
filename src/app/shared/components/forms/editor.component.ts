import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-editor',
    template: `
        <div [formGroup]="form">
            <span class="md-inputfield">
                <textarea [froalaEditor]="froalaOptions" [formControlName]="name"></textarea>
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
export class EditorComponent implements OnInit {

    @Input() private form: FormGroup;
    @Input() private type: string;
    @Input() private label: string;
    @Input() private name: string;
    @Input() private froalaOptions: Object = {
        placeholderText: 'Edit Your Content Here!',
        //pluginsEnabled: ['image', 'link'],
        charCounterCount: false
    };

    private formControl: AbstractControl;
    private error: string;

    constructor() { }

    ngOnInit() {
        this.formControl = this.form.controls[this.name];

        // Error validation
        this.form
            .controls[this.name]
            .valueChanges
            .subscribe(data => this.error = onValueChangedFormControl(this.formControl, data));

            // config FroalaEditor
            $.FroalaEditor.ICON_TEMPLATES = {
                font_awesome: '<i class="faa faa-[NAME]"></i>'
            };
    }

    @Input()
    set errors(errors: Object){
        if (this.name && errors && errors[this.name]) {
            this.error = errors[this.name];
        }
    }

}

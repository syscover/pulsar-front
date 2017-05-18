import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
declare const jQuery: any; // jQuery definition

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
    @Input() private placeholder: string;
    @Input() private heightMin: number;
    @Input() private heightMax: number;

    private froalaOptions: FroalaOptions = new FroalaOptions();

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

            // config custom FroalaEditor
            jQuery.FroalaEditor.ICON_TEMPLATES = {
                font_awesome: '<i class="faa faa-[NAME]"></i>'
            };

            // set froala option properties
            this.froalaOptions.placeholderText = this.placeholder;
            this.froalaOptions.heightMin = this.heightMin;
            this.froalaOptions.heightMax = this.heightMax;
            this.froalaOptions.enter = jQuery.FroalaEditor.ENTER_BR;
            this.froalaOptions.tabSpaces = 4;
            this.froalaOptions.pluginsEnabled = [
                'align',
                'charCounter',
                'codeBeautifier',
                'codeView',
                'colors',
                'draggable',
                'emoticons',
                'entities',
                'file',
                'fontFamily',
                'fontSize',
                'fullscreen',
                'image',
                'imageManager',
                'inlineStyle',
                'lineBreaker',
                'link',
                'lists',
                'paragraphFormat',
                'paragraphStyle',
                //'quickInsert',
                'quote',
                'save',
                'table',
                'url',
                'video',
                'wordPaste'
            ];
    }

    @Input()
    set errors(errors: Object){
        if (this.name && errors && errors[this.name]) {
            this.error = errors[this.name];
        }
    }

}

class FroalaOptions {
    public placeholderText: string;
    public charCounterCount: boolean;
    public pluginsEnabled: string[];
    public heightMin: number;
    public heightMax: number;
    public enter: number;
    public tabSpaces: number;
}

import { ConfigService } from './../../../core/services/config/config.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { onValueChangedFormControl } from './../../super/core-validation';
declare const jQuery: any; // jQuery definition

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

    @Input() form: FormGroup;
    @Input() type: string;
    @Input() label: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() heightMin: number;
    @Input() heightMax: number;

    froalaOptions: FroalaOptions = new FroalaOptions();

    formControl: AbstractControl;
    error: string;

    constructor(
        private configService: ConfigService
    ) { }

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
            this.froalaOptions.key = this.configService.get('froalaKey');
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
                //'image',
                //'imageManager',
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
                //'video',
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
    public key: string;
    public placeholderText: string;
    public charCounterCount: boolean;
    public pluginsEnabled: string[];
    public heightMin: number;
    public heightMax: number;
    public enter: number;
    public tabSpaces: number;
}


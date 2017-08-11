import { Component, Renderer2, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { onValueChangedFormControl } from './../../super/core-validation';
import { ConfigService } from './../../../core/services/config/config.service';
import { AttachmentFamily } from './../../../admin/admin.models';
import * as _ from 'lodash';
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
export class EditorComponent implements OnInit, OnChanges {

    @Input() form: FormGroup;
    @Input() type: string;
    @Input() label: string;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() heightMin: number;
    @Input() heightMax: number;
    @Input() imageUploadURL: string;
    @Input() imageStyles: Object;
    @Input() attachmentFamilies: AttachmentFamily[];

    froalaOptions: FroalaOptions = new FroalaOptions();
    formControl: AbstractControl;
    error: string;

    constructor(
        private configService: ConfigService,
        private renderer: Renderer2
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
        this.froalaOptions.enter = jQuery.FroalaEditor.ENTER_DIV;
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
            //'file',
            'fontFamily',
            'fontSize',
            'fullscreen',
            'image',
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
            'video',
            'wordPaste'
        ];
        this.froalaOptions.events = {
            'froalaEditor.image.uploaded' : (e, editor, response) => {
                //
            },
            'froalaEditor.image.beforeUpload' : (e, editor, images) => {
                //
            },
            'froalaEditor.image.inserted' : (e, editor, $img, response) => {
                for (const image of $img) {
                    this.renderer.addClass(image, 'ps-uploaded');
                    let objResponse = JSON.parse(response);
                    this.renderer.setAttribute(image, 'data-ps-image', JSON.stringify(objResponse.image));
                }
            },
            'froalaEditor.commands.after': (e, editor, cmd, param1) => {
                // after change style
                if (cmd === 'imageStyle') {
                    if (param1.indexOf('ps-attachment-family') !== -1) {
                        for (const image of editor.image.get()) {
                            if (image.classList.contains(param1)) {
                                // get attachment family know with preview
                                let attachmentFamily = _.find(this.attachmentFamilies, {id: parseInt(param1.split('-')[3])});
                                this.renderer.setStyle(image, 'width', `${attachmentFamily.width}px`);
                            }
                        }
                    }
                }
            }
        };
    }

    ngOnChanges() {
        if (this.imageUploadURL) {
            this.froalaOptions.imageUploadMethod = 'POST';
            this.froalaOptions.requestWithCORS = true;
            this.froalaOptions.imageUploadURL = this.imageUploadURL;
            this.froalaOptions.imageResizeWithPercent = true;
            this.froalaOptions.imageRoundPercent = true;
            this.froalaOptions.imageDefaultWidth = 100;
            this.froalaOptions.imageSplitHTML = true;
        }
        this.froalaOptions.imageStyles = Object.assign({},
            this.imageStyles,
            {
                'fr-rounded': 'Rounded',
                'fr-bordered': 'Bordered'
            }
        );
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
    public imageUploadMethod: string;
    public requestWithCORS: boolean;
    public imageUploadURL: string;
    public imageDefaultWidth: number;
    public imageResizeWithPercent: boolean;
    public imageRoundPercent: boolean;
    public imageSplitHTML: boolean;
    public events: Object;
    public imageStyles: Object;
}

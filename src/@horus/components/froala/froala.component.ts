import { Component, Renderer2, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../services/config.service';
import { AttachmentFamily } from 'app/main/apps/admin/admin.models';
import * as _ from 'lodash';
declare const jQuery: any;
const noop = () => {};

@Component({
    selector: 'dh2-froala',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FroalaComponent),
            multi: true
        }
    ],
    template: '<div [froalaEditor]="froalaOptions" [(froalaModel)]="value"></div>',
    styles: [`
        :host{
            margin-bottom: 20px;
        }
        .ui-messages-error {
            position: absolute;
        }
        input.ng-dirty.ng-invalid {
            border-bottom-color: #e62a10;
        }`]
})
export class FroalaComponent implements OnInit 
{
    @Input() placeholder: string;
    @Input() heightMin: number;
    @Input() heightMax: number;
    @Input() attachmentFamilies: AttachmentFamily[] = [];
    @Input() imageUploadURL: string;
    froalaOptions: any = {};
    value: string;
    
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (o: any) => void = noop;

    constructor(
        private configService: ConfigService,
        private renderer: Renderer2,
        private translateService: TranslateService
    ) { }

    // accessor to get imageStyles with classes build from attachment families
    get imageStyles()
    {
        const imageStyles = {};
        for (const attachmentFamily of this.attachmentFamilies)
        {
            imageStyles['dh2-attachment-family-' + attachmentFamily.id] = attachmentFamily.name; // Images styles for Froala
        }
        return imageStyles;
    }

    writeValue(value: string): void
    {
        this.value = value;
    }
    registerOnChange(fn): void
    {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn): void
    { 
        this.onTouchedCallback = fn;
    }

    ngOnInit(): void
    {
        if (! this.imageUploadURL) this.imageUploadURL = this.configService.get('apiUrl') + '/api/v1/admin/wysiwyg/upload';

        // set froala option properties
        this.froalaOptions.key = this.configService.get('froalaKey');

        // set fontawesome 5
        this.froalaOptions.iconsTemplate = 'font_awesome_5';

        // TODO, Detect change language, now is not possible
        // https://github.com/froala/angular-froala-wysiwyg/issues/66
        this.froalaOptions.language = this.translateService.currentLang;
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
            // 'file',
            'fontFamily',
            'fontSize',
            'fullscreen',
            'image',
            // 'imageManager',
            'inlineStyle',
            'lineBreaker',
            'link',
            'lists',
            'paragraphFormat',
            'paragraphStyle',
            // 'quickInsert',
            'quote',
            'save',
            'table',
            'url',
            'video',
            'wordPaste'
        ];

        this.froalaOptions.events = {
            'froalaEditor.blur' : (e, editor, response) => {
                this.onTouchedCallback();
            },
            'froalaEditor.contentChanged' : (e, editor, response) => {
                this.onChangeCallback(editor.html.get());
            },
            'froalaEditor.image.uploaded' : (e, editor, response) => {
                //
            },
            'froalaEditor.image.beforeUpload' : (e, editor, images) => {
                //
            },
            'froalaEditor.image.inserted' : (e, editor, $img, response) => {
                for (const image of $img) 
                {
                    this.renderer.addClass(image, 'dh2-uploaded');
                    const objResponse = JSON.parse(response);
                    this.renderer.setAttribute(image, 'data-dh2-image', JSON.stringify(objResponse.image));
                }
            },
            'froalaEditor.commands.after': (e, editor, cmd, param1, param2) => {
                // after change style
                if (cmd === 'imageStyle') 
                {
                    if (param1.indexOf('dh2-attachment-family') !== -1) 
                    {
                        for (const image of editor.image.get()) 
                        {
                            if (image.classList.contains(param1)) 
                            {
                                // get attachment family know with preview
                                const attachmentFamily = _.find(this.attachmentFamilies, {id: +param1.split('-')[3]});
                                this.renderer.setStyle(image, 'width', `${attachmentFamily.width}px`);
                            } 
                            else 
                            {
                                // check that image has any class from attachment families
                                let hasClass = false;
                                image.classList.forEach((value, index) => {
                                    if (value.indexOf('dh2-attachment-family') !== -1)
                                    {
                                        const attachmentFamily = _.find(this.attachmentFamilies, {id: +value.split('-')[3]});
                                        this.renderer.setStyle(image, 'width', `${attachmentFamily.width}px`);
                                        hasClass = true;
                                    }
                                });

                                if (! hasClass) this.renderer.setStyle(image, 'width', `100%`);
                            }
                        }
                    }
                }
            }
        };

        if (this.imageUploadURL) 
        {
            this.froalaOptions.imageUploadMethod = 'post';
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
}

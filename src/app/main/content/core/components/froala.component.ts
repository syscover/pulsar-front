import { Component, Renderer2, Input, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { ConfigService } from './../services/config.service';
import { AttachmentFamily } from './../../apps/admin/admin.models';
import * as _ from 'lodash';
const noop = () => {};
declare const jQuery: any; // jQuery definition

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
            margin-bottom: 40px;
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
    @Input() attachmentFamilies: AttachmentFamily[];
    froalaOptions: any = {};
    value: string;
    
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (o: any) => void = noop;






    
    
    
    @Input() imageUploadURL: string;
    @Input() imageStyles: Object;
    
    constructor(
        private configService: ConfigService,
        private renderer: Renderer2
    ) { }

    writeValue(value: string)
    {
        this.value = value;
    }
    registerOnChange(fn) 
    {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) 
    { 
        this.onTouchedCallback = fn;
    }

    ngOnInit() 
    {
        // config custom FroalaEditor
        jQuery.FroalaEditor.ICON_TEMPLATES = {
            font_awesome: '<i class="fa fa-[NAME]"></i>'
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
            'froalaEditor.input' : (e, editor, response) => {
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
                    this.renderer.addClass(image, 'ps-uploaded');
                    const objResponse = JSON.parse(response);
                    this.renderer.setAttribute(image, 'data-ps-image', JSON.stringify(objResponse.image));
                }
            },
            'froalaEditor.commands.after': (e, editor, cmd, param1, param2) => {
                // after change style
                if (cmd === 'imageStyle') 
                {
                    if (param1.indexOf('ps-attachment-family') !== -1) 
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
                                this.renderer.setStyle(image, 'width', `100%`);
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

import { Component, ViewChildren, QueryList, Input, OnInit, OnChanges, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { DragulaService } from 'ng2-dragula';
import { TranslateService } from '@ngx-translate/core';
import { AttachmentsService } from '../attachments.service';
import { AttachmentItemComponent } from '../attachment-item/attachment-item.component';
import { CropperDialogComponent } from './../cropper-dialog.component';
import { AttachmentFamily, Attachment } from './../../../../apps/admin/admin.models';
import { ConfigService } from './../../../services/config.service';
import { environment } from 'environments/environment';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-attachments',
    templateUrl: './attachments.component.html',
    styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit, OnChanges
{
    // Input elements
    @Input() placeholder: String;
    @Input() form: FormGroup;
    @Input() name: string;                                  // name of input that contain attachmens FormArray
    @Input() value: Attachment[];                           // array of attachments to init component
    @Input() families: AttachmentFamily[] = [];             // families for AttachmentItemComponent
    @Input() endpoint: string;                              // API url where call once drop elements
    // @Input() withCredentials: boolean;                      // property for XMLHttpRequest object

    // View elements
    @ViewChild('attachmentLibrary')  attachmentLibrary;
    @ViewChild('attachmentLibraryMask') attachmentLibraryMask;
    @ViewChildren(AttachmentItemComponent) attachmentItems: QueryList<AttachmentItemComponent>;

    items: FormArray;
    files: File[];                          // files uploaded across XMLHttpRequest
    attachment: FormGroup;                  // formGroup that contain attachment that will be crop
    attachmentFamily: AttachmentFamily;     // variable to contain attachment family where we take crop properties

    // displayDialog = false;
    progress = 0;

    constructor(
        private fb: FormBuilder,
        private renderer: Renderer2,
        private sanitizer: DomSanitizer,
        private attachmentsService: AttachmentsService,
        private dialog: MatDialog,
        private dragulaService: DragulaService,
        private translateService: TranslateService,
        private configService: ConfigService
    ) { }

    ngOnInit(): void
    {
        // TODO, use drag and drop angular native
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'dragenter', ($event) => {
            this._dragEnterHandler($event);
        });
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'dragover', ($event) => {
            this._dragOverHandler($event);
        });
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'dragleave', ($event) => {
            this._dragLeaveHandler($event);
        });
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'drop', ($event) => {
            this._dropHandler($event);
        });

        this.dragulaService.drop('bag-one').subscribe(() => {
            // set new sort
            for (let i = 0; this.attachments.controls.length > i; i++) 
            {
                (this.attachments.at(i) as FormGroup).controls['sort'].setValue(i);
            }
            this._touchFormAttachments();
        });

        if (! this.endpoint) this.endpoint = this.configService.get('apiUrl') + '/api/v1/admin/attachment-upload';
    }

    ngOnChanges(): void
    {
        // load values from input
        // set value from component, to init with values only 
        // when the component is created or change value input
        if (this.value) this._setValue(this.value);
    }

    get attachments(): FormArray
    {
        return this.form.get(this.name) as FormArray;
    }

    private _setValue(attachments: Attachment[]): void
    {
        // create and set attachments FormGroup
        for (const attachment of attachments) this._createAttachment(attachment);
    
        if (this.attachments.length > 0) this.disablePlaceholder();    
    }

    private _createAttachment(attachment?): void
    {
        // add attachment FormGroup to attachments FormArray
        // with function attachments get FormArray
        const attachmentFg = this.fb.group({
            id: '',
            lang_id: '',
            object_id: '',
            object_type: '',
            family_id: '',
            sort: ['', Validators.required ],
            alt: '',
            title: '',
            base_path: ['', Validators.required ],
            file_name: ['', Validators.required ],
            url: ['', Validators.required ],
            mime: ['', Validators.required ],
            extension: ['', Validators.required ],
            size: ['', Validators.required ],
            width: '',
            height: '',
            library_id: '',
            library_file_name: '',

            // need implement attachment library fields to avoid send __typename field that is included in response from graphQL
            // this field contain AdminAttachmentLibrary value, when we try send values GraphQL expect to optain AdminAttachmentLibraryInput
            attachment_library: this.fb.group({
                id: '',
                name: '',
                base_path: '',
                file_name: '',
                url: '',
                mime: '',
                extension: '',
                size: '',
                width: '',
                height: '',
                data: ''
            }),
            data: '',
            uploaded: '',
            changed_image: false
        });

        if (attachment !== undefined) attachmentFg.patchValue(attachment);
        
        this.attachments.push(attachmentFg);
    }

    /**
     * Methods to upload files
     */
    private _dropFile($event): void
    {
        this.files = [];

        // get files after drop files on active area
        const files = $event.dataTransfer ? $event.dataTransfer.files : $event.target.files;

        for (let i = 0; i < files.length; i++) 
        {
            const file = files[i];
            // get urls across sanitizer to avoid security cross domain
            file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
            this.files.push(files[i]);
        }

        if (this.files && this.files.length > 0) this._upload();
    }

    private _upload(): void
    {
        const xhr = new XMLHttpRequest();
        const formData = new FormData(); // create forma data to add files and inputs

        // this.onBeforeUpload.emit({
        //    'xhr': xhr,
        //    'formData': formData
        // });

        // add files to formData to send to server
        for (const file of this.files) 
        {
            formData.append('files[]', file, file.name);
            if (environment.debug) console.log('DEBUG - append file: ', file);
        }

        // progress var
        /*xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
            if (e.lengthComputable) {
              this.progress = Math.round((e.loaded * 100) / e.total);
            }
          }, false);*/

        // set function  onreadystatechange that will be called
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                // this.progress = 0;

                if (xhr.status >= 200 && xhr.status < 300) 
                {
                    const response = <any>JSON.parse(xhr.response);

                    // save attachments from file uploded
                    for (const attachment of response.data.attachmentsTmp) 
                    {
                        attachment.uploaded     = true;                                     // mark all attachments that have been loaded
                        attachment.sort         = this.attachments.controls.length + 1;     // set sort value
                        this._createAttachment(attachment);                                 // create formGroup and patch value
                        this._touchFormAttachments();
                    }

                } else {
                    // this.onError.emit({xhr: xhr, files: this.files});
                }

                // when finish xhr request, empty files array for the following uploads
                this.files = [];
            }
        };

        xhr.open('POST', this.endpoint, true);
        // xhr.withCredentials = this.withCredentials;

        xhr.send(formData);
    }

    enableCropHandler($event): void
    {
        if (environment.debug) console.log('DEBUG - trigger enableCropHandler with this event: ', $event);

        // show dialog image
        const dialogRef = this.dialog.open(CropperDialogComponent, {
            data: { 
                attachment: $event.attachment,
                attachmentFamily: _.find(this.families, {'id': $event.family_id}),
                form: this.form
            },
            height: '90%',
            width: '90%'
        });
    }

    removeItemHandler($event): void
    {
        const attachment = $event.attachment as FormGroup;

        this.attachmentsService.
            deleteAttachment(attachment.value)
            .subscribe(({data}) => {

                // file deleted
                for (let i = 0; this.attachments.length; i++) 
                {
                    const formGroup = this.attachments.at(i) as FormGroup;

                    if (formGroup.controls['file_name'].value === attachment.controls['file_name'].value) 
                    {
                        // delete attachment from FormArray
                        this.attachments.removeAt(i);

                        this._touchFormAttachments();

                        // break to not continue with for, beacuse lenght attachments has changed
                        break;
                    }
                }

                // show placeholder if has not any item
                if (this.attachments.length === 0) 
                {
                    this.enablePlaceholder();
                }
            });
    }

    private _touchFormAttachments(): void
    {
        this.form.markAsDirty();
        this.form.markAsTouched();
    }

    // methods to manage layers
    private _dragEnterHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement) 
        {
            if (! this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) this.activateMask();
        }
    }

    private _dragOverHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement)
        {
            if (! this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) this.activateMask();
        } 
        else 
        {
            if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) this.deactivateMask();
        }
    }

    private _dragLeaveHandler($event): void
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement) 
        {
            if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) this.deactivateMask();
        }
    }

    private _dropHandler($event): void
    {
        $event.preventDefault();
        if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) 
        {
            this.deactivateMask();
            this.disablePlaceholder();
        }
        this._dropFile($event);
    }

    private enablePlaceholder(): void
    {
        this.renderer.removeClass(this.attachmentLibrary.nativeElement, 'has-attachment');
    }

    private disablePlaceholder(): void
    {
        this.renderer.addClass(this.attachmentLibrary.nativeElement, 'has-attachment');
    }

    private activateMask(): void
    {
        this.renderer.addClass(this.attachmentLibraryMask.nativeElement, 'active-mask');
    }

    private deactivateMask(): void
    {
        this.renderer.removeClass(this.attachmentLibraryMask.nativeElement, 'active-mask');
    }
}

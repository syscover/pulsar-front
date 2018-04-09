import { Component, ViewChildren, QueryList, Input, OnInit, OnChanges, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { AttachmentsService } from './../attachments.service';
import { AttachmentItemComponent } from './../attachment-item/attachment-item.component';
import { CropperDialogComponent } from './../cropper-dialog.component';
import { AttachmentFamily, Attachment } from './../../../../apps/admin/admin.models';
import { environment } from './../../../../../../../environments/environment';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-attachments',
    templateUrl: './attachments.component.html',
    styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit, OnChanges
{
    // Input elements
    @Input() form: FormGroup;
    @Input() name: string;                                  // name of input that contain attachmens FormArray
    @Input() value: Attachment[];                           // array of attachments to init component
    @Input() families: AttachmentFamily[] = [];             // families for AttachmentItemComponent
    @Input() endpoint: string;                              // API url where call once drop elements
    @Input() withCredentials: boolean;                      // property for XMLHttpRequest object

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
        private dragulaService: DragulaService
    ) { }

    ngOnInit() 
    {
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'dragenter', ($event) => {
            this.dragEnterHandler($event);
        });
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'dragover', ($event) => {
            this.dragOverHandler($event);
        });
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'dragleave', ($event) => {
            this.dragLeaveHandler($event);
        });
        this.renderer.listen(this.attachmentLibrary.nativeElement, 'drop', ($event) => {
            this.dropHandler($event);
        });
        this.dragulaService.drop.subscribe(() => {
            // set new sort
            for (let i = 0; this.attachments.controls.length > i; i++) 
            {
                const formGroup = this.attachments.at(i) as FormGroup;
                formGroup.controls['sort'].setValue(i);
            }
        });
    }

    ngOnChanges() 
    {
        // set value from component, to init with values only 
        // when the component is created or change value input
        if (this.value) this.setValue(this.value);
    }

    setValue(attachments: Attachment[]) 
    {
        // create and set attachments FormGroup
        for (const attachment of attachments) this.createAttachment(attachment);
    
        if (this.attachments.length > 0) this.disablePlaceholder();    
    }

    get attachments(): FormArray
    {
        return this.form.get(this.name) as FormArray;
    }

    createAttachment(attachment?) 
    {
        // add attachment FormGroup to attachments FormArray
        // with function attachments get FormArray
        const attachmentFg = this.fb.group({
            id: null,
            lang_id: '',
            object_id: '',
            object_type: '',
            family_id: '',
            sort: [null, Validators.required ],
            alt: '',
            title: '',
            base_path: ['', Validators.required ],
            file_name: ['', Validators.required ],
            url: ['', Validators.required ],
            mime: ['', Validators.required ],
            extension: ['', Validators.required ],
            size: [null, Validators.required ],
            width: null,
            height: null,
            library_id: '',
            library_file_name: '',
            // need implement attachment library fields to avoid send __typename field that is included in response from graphQL
            // this field contain AdminAttachmentLibrary value, when we try send values GraphQL expect to optain AdminAttachmentLibraryInput
            attachment_library: this.fb.group({
                id: null,
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
            uploaded: null
        });

        if (attachment !== undefined) attachmentFg.patchValue(attachment);
        
        this.attachments.push(attachmentFg);
    }

    private dragEnterHandler($event) 
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement) 
        {
            if (! this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) 
            {
                this.activateMask();
            }
        }
    }

    private dragOverHandler($event)
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement)
        {
            if (! this.attachmentLibraryMask.nativeElement.classList.contains('active-mask'))
            {
                this.activateMask();
            }
        } 
        else 
        {
            if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask'))
            {
                this.deactivateMask();
            }
        }
    }

    private dragLeaveHandler($event)
    {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement) 
        {
            if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) 
            {
                this.deactivateMask();
            }
        }
    }

    private dropHandler($event)
    {
        $event.preventDefault();
        if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) 
        {
            this.deactivateMask();
            this.disablePlaceholder();
        }
        this.onFileSelect($event);
    }

    private enablePlaceholder()
    {
        this.renderer.removeClass(this.attachmentLibrary.nativeElement, 'has-attachment');
    }

    private disablePlaceholder()
    {
        this.renderer.addClass(this.attachmentLibrary.nativeElement, 'has-attachment');
    }

    private activateMask() 
    {
        this.renderer.addClass(this.attachmentLibraryMask.nativeElement, 'active-mask');
    }

    private deactivateMask() 
    {
        this.renderer.removeClass(this.attachmentLibraryMask.nativeElement, 'active-mask');
    }

    /**
     * Methods to upload files
     */
    onFileSelect($event) 
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

        if (this.files && this.files.length > 0) this.upload();
    }

    upload() 
    {
        const xhr = new XMLHttpRequest();
        const formData = new FormData(); // create forma data to add files and inputs

		/* this.onBeforeUpload.emit({
            'xhr': xhr,
            'formData': formData
        }); */

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
                    for (const attachment of response.data.attachmentsTmp) {
                        attachment.uploaded     = true;        // mark all attachments that have been loaded
                        attachment.sort         = this.attachments.controls.length + 1; // set sort value
                        this.createAttachment(attachment);  // create formgroup and patch value
                    }

                } else {
                    // this.onError.emit({xhr: xhr, files: this.files});
                }

                // when finish xhr request, empty files array for the following uploads
                this.files = [];
            }
        };

        xhr.open('POST', this.endpoint, true);
        //xhr.withCredentials = this.withCredentials;

        xhr.send(formData);
    }

    enableCropHandler($event) 
    {
        if (environment.debug) console.log('DEBUG - trigger enableCropHandler with this event: ', $event);

        // show dialog image
        const dialogRef = this.dialog.open(CropperDialogComponent, {
            data: { 
                attachment: $event.attachment,
                attachmentFamily: _.find(this.families, {'id': $event.family_id})
            },
            height: '90%',
            width: '90%'
        });
    }

    removeItemHandler($event) 
    {
        const attachment = $event.attachment as FormGroup;

        this.attachmentsService.
            deleteAttachment(attachment.value)
            .subscribe(({data}) => {

                // file deleted
                for (let i = 0; this.attachments.length; i++) {

                    const formGroup = this.attachments.at(i) as FormGroup;

                    if (formGroup.controls['file_name'].value === attachment.controls['file_name'].value) 
                    {
                        // delete attachment from FormArray
                        this.attachments.removeAt(i);
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
}

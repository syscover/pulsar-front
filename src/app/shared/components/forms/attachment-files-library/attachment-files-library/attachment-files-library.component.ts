import { Component, ViewChildren, QueryList, Input, OnChanges, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

declare const jQuery: any; // jQuery definition

import { AttachmentService } from './../attachment.service';
import { AttachmentItemComponent } from './../attachment-item/attachment-item.component';
import { JsonResponse } from './../../../../classes/json-respose';
import { AttachmentFamily, Attachment, AttachmentLibrary } from './../../../../../admin/admin.models';
import * as _ from 'lodash';
import * as Cropper from 'cropperjs';

@Component({
    selector: 'ps-attachment-files-library',
    templateUrl: './attachment-files-library.html',
    styleUrls: ['./attachment-files-library.scss']
})
export class AttachmentFilesLibraryComponent implements OnChanges, OnInit {

    // Input elements
    @Input() form: FormGroup;
    @Input() name: string;                                  // name of input that contain attachmens FormArray
    @Input() attachmentFamilies: AttachmentFamily[] = [];   // families for AttachmentItemComponent

   // @Input() attachments: Attachment[] = [];                // attachements uploaded or attachemets
    @Input() folder: string;                                // folder where will be stored the files
    @Input() apiUrl: string;                                // API url where call once drop elements
    @Input() withCredentials: boolean;                      // property for XMLHttpRequest object

    // View elements
    @ViewChild('attachmentLibrary')  attachmentLibrary;
    @ViewChild('attachmentLibraryMask') attachmentLibraryMask;
    @ViewChild('cropperImage') cropperImage;
    @ViewChild('cropperPreview') cropperPreview;
    @ViewChild('myModal') myModal;
    @ViewChildren(AttachmentItemComponent) attachmentItems: QueryList<AttachmentItemComponent>;

    // properties
    files: File[];                          // files uploaded across XMLHttpRequest
    displayDialog: boolean = false;         // to show dialog, variable with double data binding
    cropper: Cropper;                       // varible to contain copper object
    attachment: FormGroup;                  // formGroup that contain attachment that will be crop
    attachmentFamily: AttachmentFamily;     // variable to contain attachment family where we take crop properties
    image: ElementRef;                      // image where will be load new image cropped


    public progress: number = 0;

    constructor(
        private fb: FormBuilder,
        private renderer: Renderer2,
        private sanitizer: DomSanitizer,
        private attachmentService: AttachmentService
    ) { }

    ngOnChanges() {
        /*console.log(this.form.controls[this.name]);
        if (this.form.controls[this.name].value) {
            this.attachments = this.form.controls[this.name].value;
            this.deactivateMask();
            this.renderer.addClass(this.attachmentLibrary.nativeElement, 'has-attachment');
            this.setSortable(); // set sortable attachments
        }*/
    }

    ngOnInit() {
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
    }

    setValue(attachments: Attachment[]) {

        const attachmentFGs = attachments.map(attachment => this.fb.group(attachment));
        const attachmentsFormArray = this.fb.array(attachmentFGs);
        this.form.setControl(this.name, attachmentsFormArray);


        console.log(this.form);


        //if (attachments.length > 0) {
            // this.deactivateMask();
        //}

       /* for (const attachment of attachments) {
            // this.createAttachment();
        }*/

        //console.log(this.form.get(this.name));
    }

    get attachments(): FormArray {
        return this.form.get(this.name) as FormArray;
    }

    createAttachment(attachment = undefined) {
        // add attachment FormGroup to attachments FormArray
        // call function get attachments()
        let attachmentFg = this.fb.group({
            id: null,
            lang_id: '',
            object_id: '',
            object_type: '',
            family_id: '',
            name: ['', Validators.required ],
            file_name: ['', Validators.required ],
            extension: ['', Validators.required ],
            base_path: ['', Validators.required ],
            url: ['', Validators.required ],
            mime: ['', Validators.required ],
            size: [null, Validators.required ],
            width: null,
            height: null,
            sort: [null, Validators.required ],
            library_id: '',
            attachment_library: '',
            data: ''
        });

        if (attachment !== undefined) {
            attachmentFg.patchValue(attachment);
        }

        this.attachments.push(attachmentFg);
    }

    private dragEnterHandler($event) {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement) {
            if (! this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) {
                this.activateMask();
            }
        }
    }

    private dragOverHandler($event) {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement) {
            if (! this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) {
                this.activateMask();
            }
        } else {
            if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) {
                this.deactivateMask();
            }
        }
    }

    private dragLeaveHandler($event) {
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement) {
            if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) {
                this.deactivateMask();
            }
        }
    }

    private dropHandler($event) {
        $event.preventDefault();
        if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) {
            this.deactivateMask();
            this.renderer.addClass(this.attachmentLibrary.nativeElement, 'has-attachment');
        }

        this.onFileSelect($event);
    }

    private activateMask() {
        this.renderer.addClass(this.attachmentLibraryMask.nativeElement, 'active-mask');
    }

    private deactivateMask() {
        this.renderer.removeClass(this.attachmentLibraryMask.nativeElement, 'active-mask');
    }

    /**
     * Methods to upload files
     */
    onFileSelect($event) {
        //this.msgs = [];
        this.files = [];

        let files = $event.dataTransfer ? $event.dataTransfer.files : $event.target.files;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            //if (this.validate(file)) {
              //  if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
              //  }
                this.files.push(files[i]);
            //}
        }

        //this.onSelect.emit({originalEvent: event, files: files});

        if (this.hasFiles()) {
            this.upload();
        }
    }

    upload() {
        //this.msgs = [];
        const xhr = new XMLHttpRequest();
        let formData = new FormData(); // create forma data to add files and inputs

		/*this.onBeforeUpload.emit({
            'xhr': xhr,
            'formData': formData
        });*/

        // append data for server
        formData.append('folder', this.folder);

        // add files to formData to send to server
        for (const file of this.files) {
            formData.append('files[]', file, file.name);
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

                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = <JsonResponse>JSON.parse(xhr.response);

                    // save attachments from file uploded
                    for (const attachment of response.data.attachmentsTmp) {
                        attachment.uploaded  = true;        // mark all attachments that have been loaded
                        this.createAttachment(attachment);  // create formgroup and patch value
                    }

                    // sort elements when attach new element
                    this.onSortHandler();

                    // set sortable attachments
                    this.setSortable();

                } else {
                    // this.onError.emit({xhr: xhr, files: this.files});
                }

                this.clearFiles();
            }
        };

        xhr.open('POST', this.apiUrl, true);
        xhr.withCredentials = this.withCredentials;
        xhr.send(formData);
    }

    hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }

    clearFiles() {
        this.files = [];
        //this.onClear.emit();
    }

    enableCropHandler($event) {

        // instance attachment to be sent in cropHandler
        this.attachment = $event.attachment;
        this.image = $event.image;

        console.log(this.attachment);

        // get attachment family
        this.attachmentFamily = <AttachmentFamily>_.find(this.attachmentFamilies, ['id', $event.family_id]);

        // get image from item changed and instance dialog image
        this.renderer.setProperty(this.cropperImage.nativeElement, 'src', $event.attachment.controls['attachment_library'].value.url);

        // set crop on dialog image
        this.cropper = new Cropper(this.cropperImage.nativeElement, {
            aspectRatio: this.attachmentFamily.width / this.attachmentFamily.height,
            viewMode: 2,
            minContainerWidth: 0,
            preview: this.cropperPreview.nativeElement
        });

        // show dialog image
        this.displayDialog = true;
    }

    disableCropHandler($event) {
        this.renderer.setProperty(this.cropperImage.nativeElement, 'src', '');
        this.cropper.destroy();
    }

    cropHandler($event) {
        this.attachmentService
            .setCropImage({
                crop: this.cropper.getData('rounded'),
                attachment: this.attachment.value       // get values from formGroup
            })
            .subscribe(data => {
                // set attachemnt family id
                data.data.attachment.family_id = this.attachmentFamily.id;
                this.attachment.patchValue(data.data.attachment);

                // add random to force refresh image src
                this.renderer.setProperty(this.image.nativeElement, 'src', data.data.attachment.url + '?' + Math.random());

                this.displayDialog = false; // hide crop dialog
            });
    }

    removeItemHandler($event) {
        /*// remove attachment from array
        _.remove(this.attachments, (attachment) => {
            return attachment.file_name === $event.attachment.file_name;
        });
        this.setInputValue();

        // show placeholder if has not any item
        if (this.attachments.length === 0) {
            this.renderer.removeClass(this.attachmentLibrary.nativeElement, 'has-attachment');
        }*/
    }

    onChangeAttachmentHandler($event) {
        console.log($event);
        console.log(this.form);
    }

    onSortHandler() {
        // get elements from dom and set attachment sort
        jQuery('ps-attachment-item').each((i, item) => {
            /*this.attachments.map((attachment: Attachment) => {
                if (attachment.file_name === jQuery(item).find('.file-name').val()) {
                    attachment.sort = i;
                }
            });*/
        });
    }

    /*
    TO DELETE
    setInputValue() {
        this.form.controls[this.name].setValue(JSON.stringify(this.attachments));
    }*/

    setSortable () {
        // set sortable attachments
        jQuery('.sortable').sortable({
            stop: ($event, ui) => {
                this.onSortHandler();
            }
        });
        jQuery('.sortable').disableSelection();
    }
}

import { Component, ViewChildren, QueryList, Input, OnInit, ViewChild, HostListener, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

declare const jQuery: any; // jQuery definition

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
export class AttachmentFilesLibraryComponent implements OnInit {

    // Input elements
    @Input() form: FormGroup;
    @Input() attachments: Attachment[] = [];                // elements uploaded
    @Input() attachmentFamilies: AttachmentFamily[] = [];   // families for AttachmentItemComponent
    @Input() name: string;                                  // name of input that contain attachmens data json
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
    files: File[];
    displayDialog: boolean = false;
    cropper;

    public progress: number = 0;


    constructor(
        private renderer: Renderer2,
        private sanitizer: DomSanitizer
    ) { }

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

    private dragEnterHandler($event) {
        console.log('dragEnterHandler');
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement) {
            if (! this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) {
                this.activateMask();
            }
        }
    }

    private dragOverHandler($event) {
        console.log('dragOverHandler');
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
        console.log('dragLeaveHandler');
        $event.preventDefault();
        if ($event.currentTarget === this.attachmentLibrary.nativeElement) {
            if (this.attachmentLibraryMask.nativeElement.classList.contains('active-mask')) {
                this.deactivateMask();
            }
        }
    }

    private dropHandler($event) {
        console.log('dropHandler');

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
        let xhr = new XMLHttpRequest();
        let formData = new FormData(); // create forma data to add files and inputs

		/*this.onBeforeUpload.emit({
            'xhr': xhr,
            'formData': formData
        });*/

        // append data for server
        formData.append('folder', this.folder);

        // add files to formData to send to server
        for (let file of this.files) {
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
                //this.progress = 0;

                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = <JsonResponse>JSON.parse(xhr.response);

                    // save attachments from file uploded
                    for (const attachment of response.data.tmp) {
                        this.attachments.push(attachment);
                    }

                    // sort elements when attach new element
                    this.onSortHandler();

                    // set sortable attachments
                    jQuery('.sortable').sortable({
                        stop: ($event, ui) => {
                            this.onSortHandler();
                        }
                    });
                    jQuery('.sortable').disableSelection();

                } else {
                    //this.onError.emit({xhr: xhr, files: this.files});
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

    activeCropHandler($event) {
        // get attachment family
        const attachmentFamily = <AttachmentFamily>_.find(this.attachmentFamilies, ['id', $event.attachmentFamily]);

        // get image from item changed and instance dialog image
        this.renderer.setProperty(this.cropperImage.nativeElement, 'src', $event.image.nativeElement.src);

        // set crop on dialog image
        this.cropper = new Cropper(this.cropperImage.nativeElement, {
            aspectRatio: attachmentFamily.width / attachmentFamily.height,
            viewMode: 2,
            minContainerWidth: 0,
            preview: this.cropperPreview.nativeElement
        });

        // show dialog image
        this.displayDialog = true;
    }

    onHideDialogHandler($event) {
        this.renderer.setProperty(this.cropperImage.nativeElement, 'src', '');
        this.cropper.destroy();
    }

    onCropHandler($event) {
        let cropperData = this.cropper.getData('rounded');
        this.displayDialog = false;
        // send server
        //this.form.controls[this.name]
    }

    onSortHandler() {
        // get elements from dom and set attachment sort
        jQuery('ps-attachment-item').each((i, item) => {
            this.attachments.map((attachment: Attachment) => {
                if (attachment.file_name === jQuery(item).find('.file-name').val()) {
                    attachment.sort = i;
                }
            });
        });
    }
}

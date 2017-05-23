import { Component, Input, OnInit, ViewChild, HostListener, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

declare const jQuery: any; // jQuery definition

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
    @Input() attachments: Attachment[] = [];
    @Input() attachmentFamilies: AttachmentFamily[] = [];
    @Input() resource_id: string;
    @Input() name: string;
    @Input() folder: string; // folder where will be stored the files
    @Input() multiple: boolean;
    @Input() base: string;
    @Input() url: string;
    @Input() withCredentials: boolean;

    // View elements
    @ViewChild('attachmentLibrary')  attachmentLibrary;
    @ViewChild('attachmentLibraryMask') attachmentLibraryMask;
    @ViewChild('cropperImage') cropperImage;
    @ViewChild('cropperPreview') cropperPreview;

    // properties
    files: File[];
    displayDialog: boolean = false;
    cropper;

    public progress: number = 0;
   /* @Input() private form: FormGroup;
    @Input() private name: string;
    private items: any[] = [1,2,3,4,5];
    @Input('attachments') private attachments;*/

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
        if (! this.multiple) {
            this.files = [];
        }

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

        for (let file of this.files) {
            formData.append(this.name, file, file.name);
        }

        /*for (let i = 0; i < this.files.length; i++) {
            formData.append(this.name, this.files[i], this.files[i].name);
        }*/

        // progress var
        /*xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
            if (e.lengthComputable) {
              this.progress = Math.round((e.loaded * 100) / e.total);
            }
          }, false);*/

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this.progress = 0;

                if (xhr.status >= 200 && xhr.status < 300) {

                    const response = <JsonResponse>JSON.parse(xhr.response);

                    // set attachments from file uploded
                    for (const attachment of response.data.library) {
                        this.attachments.push(attachment);
                    }

                } else {
                    //this.onError.emit({xhr: xhr, files: this.files});
                }
                this.clearFiles();
            }
        };

        xhr.open('POST', this.url, true);
        xhr.withCredentials = this.withCredentials;
        xhr.send(formData);

        /*const $sortable = jQuery('.sortable');
        $sortable.sortable();
        $sortable.disableSelection();*/
    }

    hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }

    clearFiles() {
        this.files = [];
        //this.onClear.emit();
    }

    /**
     * Methods to upload files
     */
    familyChangeHandler($event) {

        // get attachment family
        const attachmentFamily = <AttachmentFamily>_.find(this.attachmentFamilies, ['id', $event.attachmentFamily]);

        // get image from item changed and instance dialog image
        this.renderer.setProperty(this.cropperImage.nativeElement, 'src', $event.image.nativeElement.src);

        // set crop on dialog image
        this.cropper = new Cropper(this.cropperImage.nativeElement, {
            aspectRatio: attachmentFamily.width / attachmentFamily.height,
            viewMode: 1,
            preview: this.cropperPreview.nativeElement,
            crop: function(e) {
                console.log(e.detail.x);
                console.log(e.detail.y);
                console.log(e.detail.width);
                console.log(e.detail.height);
                console.log(e.detail.rotate);
                console.log(e.detail.scaleX);
                console.log(e.detail.scaleY);
            }
        });
        console.log('dd3');

        // show dialog image
        this.displayDialog = true;
    }

    onHideDialogHandler($event) {
        this.renderer.setProperty(this.cropperImage.nativeElement, 'src', '');
        this.cropper.destroy();
    }
}

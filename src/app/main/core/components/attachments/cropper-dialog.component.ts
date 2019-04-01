import { FormGroup } from '@angular/forms';
import { Component, ViewChild, Inject, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AttachmentsService } from './attachments.service';
import Cropper from 'cropperjs/dist/cropper.esm.js';
import { environment } from 'environments/environment';

@Component({
    selector: 'dh2-cropper-dialog',
    template: `
        <h1 mat-dialog-title>{{ title }}</h1>

        <div mat-dialog-content class="py-12">
            <div class="image-container">
                <img #cropperImage>
            </div>
        </div>

        <div mat-dialog-actions>
            <button mat-raised-button class="mat-accent mr-16" [mat-dialog-close]="true" cdkFocusInitial (click)="cropHandler()">{{ crop }}</button>
            <button mat-raised-button [mat-dialog-close]="false">{{ cancel }}</button>
        </div>
    `
})
export class CropperDialogComponent implements OnInit, OnDestroy
{
    @ViewChild('cropperImage') cropperImage;
    @ViewChild('cropperPreview') cropperPreview;
    cropper: Cropper;
    title: string;
    crop: string;
    cancel: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<CropperDialogComponent>,
        private renderer: Renderer2,
        private translateService: TranslateService,
        private attachmentsService: AttachmentsService
    ) 
    { }

    ngOnInit(): void
    {
        this.renderer.setProperty(this.cropperImage.nativeElement, 'src', this.data.attachment.controls['attachment_library'].value.url);

        // load translations for component
        this.translateService.get('ATTACHMENTS').subscribe(response => {
            this.title  = this.data.title ? this.data.title : response['TITLE'];
            this.crop   = this.data.crop ? this.data.crop : response['CROP'];
            this.cancel = this.data.cancel ? this.data.cancel : response['CANCEL'];
        });

        this.cropper = new Cropper(this.cropperImage.nativeElement, {
            aspectRatio: this.data.attachmentFamily.width && this.data.attachmentFamily.height ? this.data.attachmentFamily.width / this.data.attachmentFamily.height : NaN,
            viewMode: 2,
            minContainerWidth: 0,
           // preview: this.cropperPreview.nativeElement
        });
    }

    ngOnDestroy(): void
    {
        this.renderer.setProperty(this.cropperImage.nativeElement, 'src', '');
        this.cropper.destroy();
    }

    cropHandler(): void
    {
        this.attachmentsService
            .setCropImage({
                crop: this.cropper.getData(true),               // true to get data rounded
                attachment_family: this.data.attachmentFamily,
                attachment: this.data.attachment.value          // get values from formGroup
            })
            .subscribe(({data}) => {
                // set attachment image like changed
                data.adminCropAttachment.attachment.changed_image = true;

                if (environment.debug) console.log('DEBUG - response after crop image: ', data);

                // set attachment family id
                this.data.attachment.patchValue(data.adminCropAttachment.attachment);

                // set form like dirty
                this.data.form.markAsDirty();
            });
    }
}

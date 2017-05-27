import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
declare const jQuery: any; // jQuery definition

import { AttachmentFamily, Attachment } from './../../../../../admin/admin.models';

@Component({
    selector: 'ps-attachment-item',
    templateUrl: './attachment-item.html',
    styleUrls: ['./attachment-item.scss']
})

export class AttachmentItemComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() name: string;
    @Input() index: number;
    @Input() attachmentFamilies: AttachmentFamily[] = [];
    @Input() attachment: FormGroup;



    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() enableCrop: EventEmitter<any> = new EventEmitter();
    @Output() removeItem: EventEmitter<any> = new EventEmitter();

    @ViewChild('imageItem') imageItem;
    @ViewChild('family') family;
    @ViewChild('fileName') public fileName;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        jQuery('.open-over').on('click', ($event) => {
            jQuery($event.target).closest('.attachment-item').addClass('covered');
        });

        jQuery('.close-over').on('click', ($event) => {
            jQuery($event.target).closest('.attachment-item').removeClass('covered');
        });
    }

    private removeItemHandler($event) {
        /*this.removeItem.emit({
            attachment: this.attachment
        });*/

        jQuery($event.target).closest('ps-attachment-item').fadeOut(300, function (){
            jQuery($event.target).remove();
        });
    }

    private activeCropHandler($event) {
        // click to active cropper

        console.log(this.attachment.controls['family_id'].value);


        if (this.attachment.controls['family_id'].value !== '') {
            this.enableCrop.emit({
                image: this.imageItem, // add to event image to be updated if crop image
                attachment: this.attachment,
                family_id: parseInt(this.attachment.controls['family_id'].value)
            });
        }
    }
}

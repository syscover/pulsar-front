import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import * as _ from 'lodash';
declare var jQuery: any; // jQuery definition

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
    @Output() enableCrop: EventEmitter<any> = new EventEmitter();
    @Output() removeItem: EventEmitter<any> = new EventEmitter();

    @ViewChild('imageItem') imageItem;
    @ViewChild('family') family;
    @ViewChild('fileName') public fileName;

    familyName: string;

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

        if (this.attachment.get('family.name') !== undefined) {
            this.familyName = this.attachment.get('family.name').value;
        }
    }

    removeItemHandler($event) {
        this.removeItem.emit({
            attachment: this.attachment
        });

        jQuery($event.target).closest('ps-attachment-item').fadeOut(300, function (){
            jQuery($event.target).remove();
        });
    }

    changeFamilyHandler($event) {
        const family =  _.find(this.attachmentFamilies, {'id': Number($event.target.value)});
        this.familyName = family !== undefined ? family.name : '';
    }

    activeCropHandler($event) {
        // click to active cropper
        if (this.attachment.controls['family_id'].value !== '') {
            this.enableCrop.emit({
                image: this.imageItem, // add to event image to be updated if crop image
                attachment: this.attachment,
                family_id: parseInt(this.attachment.controls['family_id'].value)
            });
        }
    }
}

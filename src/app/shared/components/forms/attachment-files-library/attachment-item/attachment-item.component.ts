import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AttachmentFamily, Attachment } from './../../../../../modules/admin/admin.models';
import * as _ from 'lodash';
declare var jQuery: any; // jQuery definition

@Component({
    selector: 'ps-attachment-item',
    templateUrl: './attachment-item.component.html',
    styleUrls: ['./attachment-item.component.scss']
})

export class AttachmentItemComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() name: string; // name of form array attachment
    @Input() index: number; // id to indentify attachement item
    @Input() families: AttachmentFamily[] = [];
    @Input() attachment: FormGroup;
    @Output() enableCrop: EventEmitter<any> = new EventEmitter();
    @Output() removeItem: EventEmitter<any> = new EventEmitter();

    @ViewChild('imageItem') imageItem;
    family: AttachmentFamily;

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

        this.family = _.find(this.families, {'id': this.attachment.get('family_id').value});
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
        this.family =  _.find(this.families, {'id': Number($event.target.value)});
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

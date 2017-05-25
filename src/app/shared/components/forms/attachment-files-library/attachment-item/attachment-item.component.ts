import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
declare const jQuery: any; // jQuery definition

import { AttachmentFamily, Attachment } from './../../../../../admin/admin.models';

@Component({
    selector: 'ps-attachment-item',
    templateUrl: './attachment-item.html',
    styleUrls: ['./attachment-item.scss']
})

export class AttachmentItemComponent implements OnInit {

    @Input() attachment: Attachment;
    @Input() attachmentFamilies: AttachmentFamily[] = [];

    @Output() enableCrop: EventEmitter<any> = new EventEmitter();
    @Output() removeItem: EventEmitter<any> = new EventEmitter();

    @ViewChild('imageItem') imageItem;
    @ViewChild('family') family;
    @ViewChild('fileName') public fileName;

    constructor() { }

    ngOnInit() {
        jQuery('.open-over').on('click', ($event) => {
            jQuery($event.target).closest('.attachment-item').addClass('covered');
        });

        jQuery('.close-over').on('click', ($event) => {
            jQuery($event.target).closest('.attachment-item').removeClass('covered');
        });
    }

    private removeItemHandler($event) {
        this.removeItem.emit({
            attachment: this.attachment
        });

        jQuery($event.target).closest('ps-attachment-item').fadeOut(300, function (){
            jQuery($event.target).remove();
        });
    }

    private activeCropHandler($event) {
        // click to active cropper
        if (this.family.nativeElement.value !== '') {
            this.enableCrop.emit({
                attachment: this.attachment,
                attachmentFamily: parseInt(this.family.nativeElement.value)
            });
        }
    }
}

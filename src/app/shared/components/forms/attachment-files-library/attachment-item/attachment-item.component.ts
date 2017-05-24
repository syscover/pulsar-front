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

    @Output() activeCrop: EventEmitter<any> = new EventEmitter();

    @ViewChild('imageItem') imageItem;
    @ViewChild('family') family;
    @ViewChild('fileName') public fileName;

    constructor() { }

    ngOnInit() {
        jQuery('.open-over').on('click', function(){
            jQuery(this).closest('.attachment-item').addClass('covered');
        });

        jQuery('.close-over').on('click', function(){
            jQuery(this).closest('.attachment-item').removeClass('covered');
        });

        jQuery('.remove-item').on('click', function(){
            jQuery(this).closest('.sortable-item').fadeOut(300, function (){
                jQuery(this).remove();
            });
        });
    }

    private clickHandler($event) {
        // click to active cropper
        if (this.family.nativeElement.value !== '') {
            this.activeCrop.emit({
                image: this.imageItem,
                attachmentFamily: parseInt(this.family.nativeElement.value)
            });
        }
    }
}

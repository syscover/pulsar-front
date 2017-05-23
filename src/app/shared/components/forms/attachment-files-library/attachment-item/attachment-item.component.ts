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

    @Output() familyChange: EventEmitter<any> = new EventEmitter();

    @ViewChild('imageItem') imageItem;

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

    private changeHandler($event) {
        // check that value is selected
        if ($event.target.value !== '') {
            this.familyChange.emit({
                image: this.imageItem,
                attachmentFamily: parseInt($event.target.value)
            });
        }
    }
}

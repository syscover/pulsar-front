import { Attachment } from './../attachment.models';
import { Component, Input, OnInit } from '@angular/core';
declare const jQuery: any; // jQuery definition

@Component({
    selector: 'ps-attachment-item',
    templateUrl: './attachment-item.html',
    styleUrls: ['./attachment-item.scss']
})

export class AttachmentItemComponent implements OnInit {

    @Input() attachment: Attachment;
    @Input() attachmentFamilies: any[];

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
}

import { Component, Input, Output, OnInit, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AttachmentFamily } from './../../../../apps/admin/admin.models';
import * as _ from 'lodash';
declare const jQuery: any; // jQuery definition

@Component({
    selector: 'dh2-attachment-item',
    templateUrl: './attachment-item.component.html',
    styleUrls: ['./attachment-item.component.scss']
})

export class AttachmentItemComponent implements OnInit
{
    @Input() form: FormGroup;
    @Input() name: string; // name of form array attachment
    @Input() index: number; // id to indentify attachement item
    @Input() families: AttachmentFamily[] = [];
    @Input() attachment: FormGroup;
    @Output() enableCrop: EventEmitter<any> = new EventEmitter();
    @Output() removeItem: EventEmitter<any> = new EventEmitter();

    @ViewChild('openOver') openOver;
    @ViewChild('closeOver') closeOver;
    @ViewChild('image') image;
    family: AttachmentFamily;

    constructor(
        private fb: FormBuilder,
        private renderer: Renderer2
    ) { }

    ngOnInit() 
    {
        this.renderer.listen(this.openOver.nativeElement, 'click', ($event) => {
            this.renderer.addClass($event.target.closest('.attachment-item'), 'covered');
        });

        this.renderer.listen(this.closeOver.nativeElement, 'click', ($event) => {
            this.renderer.removeClass($event.target.closest('.attachment-item'), 'covered');
        });
      
        this.family = _.find(this.families, {'id': this.attachment.get('family_id').value});
    }

    removeItemHandler($event) 
    {
        this.removeItem.emit({
            attachment: this.attachment
        });

        jQuery($event.target).closest('ps-attachment-item').fadeOut(300, function () {
            jQuery($event.target).remove();
        });
    }

    changeFamilyHandler($event) 
    {
        this.family =  _.find(this.families, {'id': +$event.target.value});
    }

    activeCropHandler($event) 
    {
        // click to active cropper
        if (this.attachment.controls['family_id'].value !== '') 
        {
            this.enableCrop.emit({
                image: this.image, // add to event image to be updated if crop image
                attachment: this.attachment,
                family_id: +this.attachment.get('family_id').value
            });
        }
    }
}

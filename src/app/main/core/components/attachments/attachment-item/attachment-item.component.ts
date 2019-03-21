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
    @Input()
    public form: FormGroup;
    @Input()
    public name: string; // name of form array attachment
    @Input()
    public index: number; // id to identify attachment item
    @Input()
    public families: AttachmentFamily[] = [];
    @Input()
    public attachment: FormGroup;
    @Output()
    public enableCrop: EventEmitter<any> = new EventEmitter();
    @Output()
    public removeItem: EventEmitter<any> = new EventEmitter();

    @ViewChild('openOver')
    public openOver;
    @ViewChild('closeOver')
    public closeOver;
    @ViewChild('image')
    public image;
    public family: AttachmentFamily;
    public showCropButton = false;

    constructor(
        private fb: FormBuilder,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void
    {
        this.renderer.listen(this.openOver.nativeElement, 'click', ($event) => {
            this.renderer.addClass($event.target.closest('.attachment-item'), 'covered');
        });

        this.renderer.listen(this.closeOver.nativeElement, 'click', ($event) => {
            this.renderer.removeClass($event.target.closest('.attachment-item'), 'covered');
        });
      
        this.family = <AttachmentFamily>_.find(this.families, {'id': this.attachment.get('family_id').value});
    }

    removeItemHandler($event): void
    {
        this.removeItem.emit({
            attachment: this.attachment
        });

        jQuery($event.target.closest('dh2-attachment-item')).fadeOut(300, function () {
            jQuery($event.target.closest('dh2-attachment-item')).remove();
        });
    }

    changeFamilyHandler($event): void
    {
        this.family =  _.find(this.families, {'id': +$event.target.value});
        if (
            this.family.fit_type === 1 ||
            this.family.fit_type === 4 ||
            this.family.fit_type === 5
        )
        {
            this.showCropButton = true;
        }
        else
        {
            this.showCropButton = false;
        }
    }

    activeCropHandler($event): void
    {
        // click to active cropper
        if (this.attachment.get('family_id').value !== '')
        {
            this.enableCrop.emit({
                image: this.image, // add to event image to be updated if crop image
                attachment: this.attachment,
                family_id: +this.attachment.get('family_id').value
            });
        }
    }
}

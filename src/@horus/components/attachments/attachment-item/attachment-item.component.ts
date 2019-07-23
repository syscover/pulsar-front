import { Component, Input, Output, OnInit, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AttachmentFamily } from 'app/main/apps/admin/admin.models';
import * as _ from 'lodash';
import { CROP_FIT, HEIGHT_FREE_CROP_FIT, WIDTH_FREE_CROP_FIT } from '../attachments.models';
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
    @Input() index: number; // id to identify attachment item
    @Input() families: AttachmentFamily[] = [];
    @Input() attachment: FormGroup;
    @Output() enableCrop: EventEmitter<any> = new EventEmitter();
    @Output() removeItem: EventEmitter<any> = new EventEmitter();

    @ViewChild('openOver', {static: true}) openOver;
    @ViewChild('closeOver', {static: true}) closeOver;
    @ViewChild('image', {static: false}) image;
    familySelect: AttachmentFamily;
    showCropButton = false;

    constructor(
        private fb: FormBuilder,
        private renderer: Renderer2
    )
    {}

    ngOnInit(): void
    {
        this.renderer.listen(this.openOver.nativeElement, 'click', ($event) => {
            this.renderer.addClass($event.target.closest('.attachment-item'), 'covered');
        });

        this.renderer.listen(this.closeOver.nativeElement, 'click', ($event) => {
            this.renderer.removeClass($event.target.closest('.attachment-item'), 'covered');
        });
      
        this.familySelect = <AttachmentFamily>_.find(this.families, {'id': this.attachment.get('family_id').value});

        this.setShowCropButton();
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
        // get $event.target.value with ngValue that return a object
        this.familySelect =  _.find(this.families, {'id': +$event.target.value[0]});

        this.setShowCropButton();
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

    setShowCropButton(): void
    {
        if (
            this.familySelect && (
                this.familySelect.fit_type === CROP_FIT ||
                this.familySelect.fit_type === WIDTH_FREE_CROP_FIT ||
                this.familySelect.fit_type === HEIGHT_FREE_CROP_FIT
            )
        )
        {
            this.showCropButton = true;
        }
        else
        {
            this.showCropButton = false;
        }
    }
}

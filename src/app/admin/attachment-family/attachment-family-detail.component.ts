import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { AttachmentFamilyService } from './attachment-family.service';
import { Resource, AttachmentFamily } from './../admin.models';

// custom imports
import { ResourceService } from './../resource/resource.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-attachment-family-detail',
    templateUrl: './attachment-family-detail.component.html'
})
export class AttachmentFamilyDetailComponent extends CoreDetailComponent implements OnInit {

    resources: SelectItem[] = [];
    sizes: SelectItem[] = [];
    formats: SelectItem[] = [
        { label: 'Select a format image', value: '' },
        { value: 'jpg', label: 'jpg' },
        { value: 'png', label: 'png' },
        { value: 'gif', label: 'gif' },
        { value: 'tif', label: 'tif' },
        { value: 'bmp', label: 'bmp' },
        { value: 'data-url', label: 'data-url' }
    ];

    // paramenters for parent class
    object: AttachmentFamily = new AttachmentFamily(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: AttachmentFamilyService,
        protected resourceService: ResourceService
    ) {
        super(injector);
        this.baseUri = objectService.baseUri;
    }

    ngOnInit() {
        this.resourceService.getRecords()
            .subscribe((response) => {

            this.resources = _.map(<Resource[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            }); // get resources

            this.resources.unshift({ label: 'Select a resource', value: '' });
            super.getRecordHasIdParamenter(this.f);
        });

        // get data types
        this.configService.getValue({
                key: 'pulsar.admin.sizes'
            }).subscribe((response) => {
                this.sizes = _.map(<any[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
            });
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            resource_id: ['', Validators.required ],
            name: ['', Validators.required ],
            width: null,
            height: null,
            sizes: null,
            quality: null,
            format: ''
        });
    }
}

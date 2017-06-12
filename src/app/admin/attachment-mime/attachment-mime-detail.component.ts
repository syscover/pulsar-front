import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { AttachmentMimeService } from './attachment-mime.service';
import { Resource, AttachmentMime } from './../admin.models';

// custom imports
import { ResourceService } from './../resource/resource.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-attachment-mime-detail',
    templateUrl: './attachment-mime-detail.component.html'
})
export class AttachmentMimeDetailComponent extends CoreDetailComponent implements OnInit {

    resources: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected objectService: AttachmentMimeService,
        protected resourceService: ResourceService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        this.resourceService.getRecords()
            .subscribe((response) => {

            this.resources = _.map(<Resource[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            }); // get resources

            this.resources.unshift({ label: 'Select a resource', value: '' });
            super.getRecordHasIdParamenter();
        });
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            resource_id: ['', Validators.required ],
            mime: ['', Validators.required ]
        });
    }
}

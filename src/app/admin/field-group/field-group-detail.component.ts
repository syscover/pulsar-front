import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { FieldGroupService } from './field-group.service';
import { FieldGroup, Resource } from './../admin.models';

// custom imports
import { ResourceService } from './../resource/resource.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-field-group-detail',
    templateUrl: 'field-group-detail.component.html'
})
export class FieldGroupDetailComponent extends CoreDetailComponent implements OnInit {

    resources: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected objectService: FieldGroupService,
        protected resourceService: ResourceService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        // get product types
        this.configService.getValue({
                key: 'pulsar.admin.resources_custom_fields'
            }).subscribe((response) => {
                const resourcesAllowed = <string[]>response.data; // get resources ids from config

                this.resourceService.getRecords()
                    .subscribe((response2) => {

                    // filter response to discard resources
                    let resources = _.filter(<Resource[]>response2.data, obj => {
                        return (resourcesAllowed.indexOf(obj.id) !==  -1);
                    });

                    // map resources to create SelectItem
                    this.resources = _.map(resources, obj => { // get resources
                        return { value: obj.id, label: obj.name };
                    });

                    this.resources.unshift({ label: 'Select a resource', value: '' });

                });
            });
        super.init();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            resource_id: ['', Validators.required ]
        });
    }
}

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

    private resources: SelectItem[] = [];

    // paramenters for parent class
    private object: FieldGroup = new FieldGroup(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: FieldGroupService,
        protected resourceService: ResourceService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.createForm(); // create form

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
                        return { label: obj.name, value: obj.id };
                    });

                    this.resources.unshift({ label: 'Select a resource', value: '' });

                    super.getRecordHasIdParamenter(this.f);
                });
            });
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            resource_id: ['', Validators.required ]
        });
    }
}

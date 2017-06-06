import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { ResourceService } from './resource.service';
import { Resource, Package } from '../admin.models';

// custom imports
import { PackageService } from './../package/package.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-resource-detail',
    templateUrl: './resource-detail.component.html'
})
export class ResourceDetailComponent extends CoreDetailComponent implements OnInit {

    packages: SelectItem[] = [];

    // paramenters for parent class
    object: Resource = new Resource(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: ResourceService,
        protected packageService: PackageService
    ) {
        super(injector);
        this.baseUri = objectService.baseUri;
    }

    ngOnInit() {
        this.packageService.getRecords()
            .subscribe((response) => {

            this.packages = _.map(<Package[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            }); // get packages

            this.packages.unshift({ label: 'Select a package', value: '' });
            super.getRecordHasIdParamenter(this.f);
        });
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', Validators.required ],
            name: ['', Validators.required ],
            package_id: ['', Validators.required ]
        });
    }
}

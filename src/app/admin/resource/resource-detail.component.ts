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

    constructor(
        protected injector: Injector,
        protected objectService: ResourceService,
        protected packageService: PackageService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        this.packageService.getRecords()
                .subscribe((response) => {

                this.packages = _.map(<Package[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get packages

                this.packages.unshift({ label: 'Select a package', value: '' });
            });
        super.init();
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', Validators.required ],
            name: ['', Validators.required ],
            package_id: ['', Validators.required ]
        });
    }
}

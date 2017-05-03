import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { FieldGroupService } from './field-group.service';
import { FieldGroup, Package } from './../admin.models';

// custom imports
import { PackageService } from './../package/package.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-field-group-detail',
    templateUrl: 'field-group-detail.component.html'
})
export class FieldGroupDetailComponent extends CoreDetailComponent implements OnInit {

    private packages: SelectItem[] = [];

    // paramenters for parent class
    private object: FieldGroup = new FieldGroup(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.setValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: FieldGroupService,
        protected packageService: PackageService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.createForm(); // create form

        this.packageService.getRecords()
            .subscribe((response) => {

            this.packages = _.map(<Package[]>response.data, obj => {
                return { label: obj.name, value: obj.id };
            }); // get packages

            this.packages.unshift({ label: 'Select a package', value: '' });
            super.getRecordHasIdParamenter(this.f);
        });
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            package_id: ''
        });
    }

}

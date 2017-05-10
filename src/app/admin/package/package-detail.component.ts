import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { PackageService } from './package.service';
import { Profile } from '../admin.models';

@Component({
    selector: 'ps-package-detail',
    templateUrl: 'package-detail.component.html'
})
export class PackageDetailComponent extends CoreDetailComponent implements OnInit {

    // paramenters for parent class
    private object: Profile = new Profile(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.setValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: PackageService,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.createForm(); // create form
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            root: ['', Validators.required ],
            active: '',
            sort: [null, Validators.required ]
        });
    }
}

import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { PackageService } from './package.service';
import { Profile } from '../admin.models';

@Component({
    selector: 'ps-package-detail',
    templateUrl: 'package-detail.component.html'
})
export class PackageDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected objectService: PackageService,
    ) {
        super(injector, objectService);
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

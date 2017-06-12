import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { FamilyService } from './family.service';

@Component({
    selector: 'ps-family-detail',
    templateUrl: './family-detail.component.html'
})
export class FamilyDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected objectService: FamilyService
    ) {
        super(injector, objectService);
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', Validators.required ],
            name: ['', Validators.required ]
        });
    }
}

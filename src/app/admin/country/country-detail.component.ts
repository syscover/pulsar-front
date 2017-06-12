import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CountryService } from './country.service';

@Component({
    selector: 'ps-country-detail',
    templateUrl: './country-detail.component.html'
})
export class CountryDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected objectService: CountryService
    ) {
        super(injector, objectService);
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', Validators.required ],
            name: ['', Validators.required],
            lang_id: ['', Validators.required],
            prefix: ['', Validators.required],
            sort: ['', Validators.required],
            territorial_area_1: '',
            territorial_area_2: '',
            territorial_area_3: ''
        });
    }
}

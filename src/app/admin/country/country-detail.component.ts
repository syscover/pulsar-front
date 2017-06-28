import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CountryGraphQLService } from './country-graphql.service';

@Component({
    selector: 'ps-country-detail',
    templateUrl: './country-detail.component.html'
})
export class CountryDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected grahpQL: CountryGraphQLService
    ) {
        super(injector, grahpQL);
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

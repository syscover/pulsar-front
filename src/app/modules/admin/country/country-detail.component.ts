import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { CountryGraphQLService } from './country-graphql.service';

@Component({
    selector: 'ps-country-detail',
    templateUrl: './country-detail.component.html'
})
export class CountryDetailComponent extends CoreDetailComponent {

    zones: SelectItem[] = [
        { value: 'territorial_areas_1', label: 'Territorial Areas 1' },
        { value: 'territorial_areas_2', label: 'Territorial Areas 2' },
        { value: 'territorial_areas_3', label: 'Territorial Areas 3' }
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: CountryGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            ix: null,
            id: [null, Validators.required ],
            name: [null, Validators.required],
            slug: null,
            lang_id: [null, Validators.required],
            prefix: [null, Validators.required],
            sort: [null, Validators.required],
            territorial_area_1: null,
            territorial_area_2: null,
            territorial_area_3: null,
            zones: [],
        });
    }
}

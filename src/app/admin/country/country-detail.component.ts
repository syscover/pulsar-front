import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CountryGraphQLService } from './country-graphql.service';

@Component({
    selector: 'ps-country-detail',
    templateUrl: './country-detail.component.html'
})
export class CountryDetailComponent extends CoreDetailComponent {

    zones: SelectItem[] = [
        { value: 'country', label: 'Country' },
        { value: 'territorial_area_1', label: 'Territorial Area 1' },
        { value: 'territorial_area_2', label: 'Territorial Area 2' },
        { value: 'territorial_area_3', label: 'Territorial Area 3' }
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: CountryGraphQLService
    ) {
        super(injector, graphQL);
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
            territorial_area_3: '',
            zones: [],
        });
    }
}

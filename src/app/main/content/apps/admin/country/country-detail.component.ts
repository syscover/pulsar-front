import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { animate } from '@angular/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CountryGraphQLService } from './country-graphql.service';
import { fuseAnimations } from './../../../../../core/animations';

@Component({
    selector: 'dh2-country-detail',
    templateUrl: './country-detail.component.html',
    animations: fuseAnimations
})
export class CountryDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.COUNTRY';
    zones: any[] = [
        { id: 'territorial_areas_1', name: 'Territorial Areas 1' },
        { id: 'territorial_areas_2', name: 'Territorial Areas 2' },
        { id: 'territorial_areas_3', name: 'Territorial Areas 3' }
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
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            slug: [null, Validators.required],
            prefix: null,
            sort: null,
            territorial_area_1: null,
            territorial_area_2: null,
            territorial_area_3: null,
            zones: [],
        });
    }
}

import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './country.graphql';

@Component({
    selector: 'dh2-admin-country-detail',
    templateUrl: './country-detail.component.html',
    animations: fuseAnimations
})
export class CountryDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'APPS.COUNTRY';
    objectTranslationGender = 'M';
    loadingSlug = false;
    graphQL = graphQL;
    zones: any[] = [
        { id: 'territorial_areas_1', name: 'Territorial Areas 1' },
        { id: 'territorial_areas_2', name: 'Territorial Areas 2' },
        { id: 'territorial_areas_3', name: 'Territorial Areas 3' }
    ];

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: ['', Validators.required],
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            prefix: '',
            sort: '',
            territorial_area_1: '',
            territorial_area_2: '',
            territorial_area_3: '',
            zones: [[]],
        });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}

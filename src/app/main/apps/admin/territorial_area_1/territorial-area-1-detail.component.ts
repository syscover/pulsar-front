import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/foundations/core-detail-compoment';
import { Country } from '../admin.models';
import { graphQL } from './territorial-area-1.graphql';

@Component({
    selector: 'dh2-admin-territorial-area-1-detail',
    templateUrl: './territorial-area-1-detail.component.html',
    animations: fuseAnimations
})
export class TerritorialArea1DetailComponent extends CoreDetailComponent
{
    objectTranslationTranslated;
    objectTranslationGender = 'F';
    loadingSlug = false;
    country: Country = new Country();

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);

        // set field_id in reactive form
        this.fg.controls['country_id'].setValue(this.params['country_id']);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: ['', Validators.required],
            country_id: '',
            name: ['', Validators.required],
            slug: ''
        });
    }

    argumentsRelationsObject(): object
    {
        const sqlCountry = [
            {
                command: 'where',
                column: 'admin_country.id',
                operator: '=',
                value: this.params['country_id']
            },
            {
                command: 'where',
                column: 'admin_country.lang_id',
                operator: '=',
                value: this.baseLang
            }
        ];

        return {
            sqlCountry
        };
    }

    setRelationsData(data: any): void
    {
        // admin country
        this.country = data.adminCountry;
        this.objectTranslationTranslated = this.country.territorial_area_1;
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}

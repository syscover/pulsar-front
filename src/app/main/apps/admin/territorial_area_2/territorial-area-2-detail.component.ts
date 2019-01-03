import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { Country } from '../admin.models';
import { graphQL } from './territorial-area-2.graphql';

@Component({
    selector: 'dh2-admin-territorial-area-2-detail',
    templateUrl: './territorial-area-2-detail.component.html',
    animations: fuseAnimations
})
export class TerritorialArea2DetailComponent extends CoreDetailComponent
{
    objectTranslationTranslated;
    objectTranslationGender = 'F';
    slugLoader = false;
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
            territorial_area_1_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ''
        });
    }

    argumentsRelationsObject(): Object
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
        this.objectTranslationTranslated = this.country.territorial_area_2;
    }

    handleCheckingSlug(isChecking): void
    {
        this.slugLoader = isChecking;
    }
}

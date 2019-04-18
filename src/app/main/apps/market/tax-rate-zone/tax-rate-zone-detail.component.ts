import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { Country } from '../../admin/admin.models';
import { graphQL } from './tax-rate-zone.graphql';

@Component({
    selector: 'dh2-market-tax-rate-zone-detail',
    templateUrl: 'tax-rate-zone-detail.component.html',
    animations: fuseAnimations
})
export class TaxRateZoneDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.TAX_RATE_ZONE';
    objectTranslationGender = 'M';
    baseUri = '/apps/market/taxes/tax-rate-zone';
    countries: Country[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required],
            country_id: ['', Validators.required],
            territorial_area_1_id: '',
            territorial_area_2_id: '',
            territorial_area_3_id: '',
            zip: '',
            tax_rate: ['', Validators.required]
        });
    }

    argumentsRelationsObject(): object
    {
        const sqlCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang.id
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_country.name'
            }
        ];

        return {
            sqlCountry
        };
    }

    setRelationsData(data: any): void
    {
        // set admin countries
        this.countries = data.adminCountries;
    }
}

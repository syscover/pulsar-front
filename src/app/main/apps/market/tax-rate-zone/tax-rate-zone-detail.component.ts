import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { TaxRateZoneGraphQLService } from './tax-rate-zone-graphql.service';
import { Country } from './../../admin/admin.models';

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
        protected injector: Injector,
        protected graphQL: TaxRateZoneGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            country_id: [null, Validators.required],
            territorial_area_1_id: null,
            territorial_area_2_id: null,
            territorial_area_3_id: null,
            zip: null,
            tax_rate: [null, Validators.required]
        });
    }

    argumentsRelationsObject(): Object
    {
        const sqlCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
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

    setRelationsData(data: any) 
    {
        // set admin countries
        this.countries = data.adminCountries;
    }
}


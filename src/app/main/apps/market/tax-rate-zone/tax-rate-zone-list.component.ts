import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './tax-rate-zone.graphql';

@Component({
    selector: 'dh2-market-tax-rate-zone-list',
    templateUrl: './tax-rate-zone-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class TaxRateZoneListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.TAX_RATE_ZONE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['market_tax_rate_zone.id', 'market_tax_rate_zone.name', 'market_tax_rate_zone.zip', 'market_tax_rate_zone.tax_rate'];
    displayedColumns = ['market_tax_rate_zone.id', 'market_tax_rate_zone.name', 'market_tax_rate_zone.zip', 'market_tax_rate_zone.tax_rate', 'actions'];
    baseUri = '/apps/market/taxes/tax-rate-zone';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

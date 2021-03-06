import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './tax-rule.graphql';

@Component({
    selector: 'dh2-market-tax-rule-list',
    templateUrl: './tax-rule-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class TaxRuleListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.TAX_RULE';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['market_tax_rate_zone.id', 'market_tax_rate_zone.name'];
    displayedColumns = ['market_tax_rate_zone.id', 'market_tax_rate_zone.name', 'market_tax_rate_zone.tax_rate', 'market_tax_rate_zone.priority', 'market_tax_rate_zone.sort', 'actions'];
    baseUri = '/apps/market/taxes/tax-rule';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

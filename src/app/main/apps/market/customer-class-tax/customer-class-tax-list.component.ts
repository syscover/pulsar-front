import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './customer-class-tax.graphql';

@Component({
    selector: 'dh2-market-customer-class-tax-list',
    templateUrl: './customer-class-tax-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class CustomerClassTaxListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.CUSTOMER_CLASS_TAX';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['market_customer_class_tax.id', 'market_customer_class_tax.name'];
    displayedColumns = ['market_customer_class_tax.id', 'market_customer_class_tax.name', 'actions'];
    baseUri = '/apps/market/taxes/customer-class-tax';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

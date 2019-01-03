import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './customer-group-customer-class-tax.graphql';

@Component({
    selector: 'dh2-market-customer-group-customer-class-tax-list',
    templateUrl: './customer-group-customer-class-tax-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class CustomerGroupCustomerClassTaxListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.CUSTOMER_GROUP_CUSTOMER_CLASS_TAX';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['crm_customer_group.name', 'market_customer_class_tax.name'];
    displayedColumns = ['crm_customer_group.name', 'market_customer_class_tax.name', 'actions'];
    baseUri = '/apps/market/taxes/customer-group-customer-class-tax';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    getCustomArgumentsDeleteRecord(object: any, args: Object): Object
    {
        return {
            'customer_group_id': object.customer_group_id,
            'customer_class_tax_id': object.customer_class_tax_id
        };
    }
}


import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { GroupCustomerClassTaxGraphQLService } from './group-customer-class-tax-graphql.service';

@Component({
    selector: 'dh2-group-customer-class-tax-list',
    templateUrl: './group-customer-class-tax-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class GroupCustomerClassTaxListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.GROUP_CUSTOMER_CLASS_TAX';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['crm_group.name', 'market_customer_class_tax.name'];
    displayedColumns = ['crm_group.name', 'market_customer_class_tax.name', 'actions'];
    baseUri = '/apps/market/taxes/group-customer-class-tax';

    constructor(
        protected injector: Injector,
        protected graphQL: GroupCustomerClassTaxGraphQLService
    ) {
        super(injector, graphQL);
    }

    getCustomArgumentsDeleteRecord(object: any, args: Object): Object
    {
        return {
            'group_id': object.group_id,
            'customer_class_tax_id': object.customer_class_tax_id
        };
    }
}

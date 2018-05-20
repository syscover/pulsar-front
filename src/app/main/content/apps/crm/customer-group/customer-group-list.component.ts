
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { CustomerGroupGraphQLService } from './customer-group-graphql.service';

@Component({
    selector: 'dh2-customer-group-list',
    templateUrl: './customer-group-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class CustomerGroupListComponent extends CoreListComponent 
{
    objectTranslation = 'CRM.GROUP';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['crm_customer_group.id', 'crm_customer_group.name'];
    displayedColumns = ['crm_customer_group.id', 'crm_customer_group.name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGroupGraphQLService
    ) {
        super(injector, graphQL);
    }
}

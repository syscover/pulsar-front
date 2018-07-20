
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { CustomerGraphQLService } from './customer-graphql.service';

@Component({
    selector: 'dh2-customer-list',
    templateUrl: './customer-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class CustomerListComponent extends CoreListComponent 
{
    objectTranslation = 'APPS.CUSTOMER';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['crm_customer.id', 'crm_customer.name', 'crm_customer.surname', 'crm_customer.email'];
    displayedColumns = ['crm_customer.id', 'crm_customer.name', 'crm_customer.surname', 'crm_customer.email', 'crm_customer.active', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGraphQLService
    ) {
        super(injector, graphQL);
    }
}


import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { OrderGraphQLService } from './order-graphql.service';

@Component({
    selector: 'dh2-order-list',
    templateUrl: './order-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class OrderListComponent extends CoreListComponent 
{
    objectTranslation = 'MARKET.ORDER';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['crm_customer.id', 'crm_customer.name', 'crm_customer.surname', 'crm_customer.email'];
    displayedColumns = ['crm_customer.id', 'crm_customer.name', 'crm_customer.surname', 'crm_customer.email', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: OrderGraphQLService
    ) {
        super(injector, graphQL);
    }
}

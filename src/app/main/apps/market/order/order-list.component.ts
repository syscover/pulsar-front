import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
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
    columnsSearch = ['market_order.id', 'market_order.date', 'market_order.customer_name', 'market_order.customer_surname', 'market_order.customer_email', 'market_payment_method.name', 'market_order_status.name', 'market_order.total', 'market_order_row.data'];
    displayedColumns = ['market_order.id', 'market_order.date', 'market_order.customer_name', 'market_order.customer_email', 'market_payment_method.name', 'market_order_status.name', 'market_order.total', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: OrderGraphQLService
    ) {
        super(injector, graphQL);
    }

    // overwite method to get statuses
    getCustomArgumentsGetRecords(args: Object): Object
    {    
        args['sql'].push({
            command: 'orderBy',
            operator: 'desc',
            column: 'market_order.id'
        });

        return args;
    }
}

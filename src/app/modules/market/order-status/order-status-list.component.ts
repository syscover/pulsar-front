import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { OrderStatusGraphQLService } from './order-status-graphql.service';

@Component({
    selector: 'ps-order-status-list',
    templateUrl: './order-status-list.component.html'
})
export class OrderStatusListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'market_order_status.id', 'market_order_status.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: OrderStatusGraphQLService,
    ) {
        super(injector, graphQL);
    }
}

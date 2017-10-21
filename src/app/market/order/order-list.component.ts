import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { OrderGraphQLService } from './order-graphql.service';

@Component({
    selector: 'ps-order-list',
    templateUrl: './order-list.component.html'
})
export class OrderListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'order.id', 'order.date', 'order.customer_name'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: OrderGraphQLService,
    ) {
        super(injector, graphQL);
    }
}

import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { OrderStatusGraphQLService } from './order-status-graphql.service';

@Component({
    selector: 'ps-order-status-list',
    templateUrl: './order-status-list.component.html'
})
export class OrderStatusListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'order_status.id', 'order_status.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: OrderStatusGraphQLService,
    ) {
        super(injector, graphQL);
    }
}

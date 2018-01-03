import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { OrderGraphQLService } from './order-graphql.service';
import * as _ from 'lodash';

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

    getCustomArgumentsGetRecords(args: Object) {
        args['sql'].push({
            command: 'orderBy',
            operator: 'desc',
            column: 'market_order.id'
        });

        return args;
    }
}

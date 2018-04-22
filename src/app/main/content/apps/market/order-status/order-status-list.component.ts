import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { OrderStatusGraphQLService } from './order-status-graphql.service';

@Component({
    selector: 'dh2-order-status-list',
    templateUrl: './order-status-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class OrderStatusListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.ORDER_STATUS';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['market_order_status.id', 'market_order_status.name'];
    displayedColumns = ['market_order_status.id', 'market_order_status.name', 'market_order_status.active', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected injector: Injector,
        protected graphQL: OrderStatusGraphQLService
    ) {
        super(injector, graphQL);
    }
}

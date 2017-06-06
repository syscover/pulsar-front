import { Component, Injector, HostBinding, ViewChild } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { OrderStatusService } from './order-status.service';
import { OrderStatus } from '../market.models';

@Component({
    selector: 'ps-order-status-list',
    templateUrl: './order-status-list.component.html'
})
export class OrderStatusListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'order_status.id', 'order_status.name'
    ];
    objects: OrderStatus[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        // service for parent class
        protected injector: Injector,
        protected objectService: OrderStatusService,
    ) {
        super(injector);
        this.baseUri = objectService.baseUri;
    }
}

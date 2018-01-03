import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { WarehouseGraphQLService } from './warehouse-graphql.service';

@Component({
    selector: 'ps-warehouse',
    templateUrl: './warehouse-list.component.html'
})
export class WarehouseListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'market_warehouse.id', 'market_warehouse.name'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: WarehouseGraphQLService
    ) {
        super(injector, graphQL);
    }
}

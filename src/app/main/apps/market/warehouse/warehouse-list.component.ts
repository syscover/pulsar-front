
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { WarehouseGraphQLService } from './warehouse-graphql.service';

@Component({
    selector: 'dh2-market-warehouse-list',
    templateUrl: './warehouse-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class WarehouseListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.WAREHOUSE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['market_warehouse.id', 'market_warehouse.name'];
    displayedColumns = ['market_warehouse.id', 'market_warehouse.name', 'market_warehouse.active', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: WarehouseGraphQLService
    ) {
        super(injector, graphQL);
    }
}

import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './warehouse.graphql';

@Component({
    selector: 'dh2-market-warehouse-list',
    templateUrl: './warehouse-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class WarehouseListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.WAREHOUSE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['market_warehouse.id', 'market_warehouse.name'];
    displayedColumns = ['market_warehouse.id', 'market_warehouse.name', 'market_warehouse.active', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

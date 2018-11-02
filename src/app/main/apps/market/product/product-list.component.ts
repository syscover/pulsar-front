import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './product.graphql';

@Component({
    selector: 'dh2-product-list',
    templateUrl: './product-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class ProductListComponent extends CoreListComponent 
{
    objectTranslation = 'MARKET.PRODUCT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['market_product.id', 'market_product_lang.name'];
    displayedColumns = ['market_product.id', 'market_product_lang.name', 'market_product.subtotal', 'market_product.active', 'translations', 'actions'];
    filters = [
        {'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang },
        {'command': 'where', 'column': 'object_type', 'operator': '=', 'value': null } // avoid show products with inheritances
    ];

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}

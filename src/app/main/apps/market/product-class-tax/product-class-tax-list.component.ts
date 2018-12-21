
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { ProductClassTaxGraphQLService } from './product-class-tax-graphql.service';

@Component({
    selector: 'dh2-market-product-class-tax-list',
    templateUrl: './product-class-tax-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class ProductClassTaxListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.PRODUCT_CLASS_TAX';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['market_product_class_tax.id', 'market_product_class_tax.name'];
    displayedColumns = ['market_product_class_tax.id', 'market_product_class_tax.name', 'actions'];
    baseUri = '/apps/market/taxes/product-class-tax';

    constructor(
        protected injector: Injector,
        protected graphQL: ProductClassTaxGraphQLService
    ) {
        super(injector, graphQL);
    }
}

import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { ProductGraphQLService } from './product-graphql.service';

@Component({
    selector: 'ps-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'product.id', 'product_lang.name'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: ProductGraphQLService,
    ) {
        super(injector, graphQL);
    }
}

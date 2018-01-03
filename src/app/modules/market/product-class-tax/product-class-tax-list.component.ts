import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { ProductClassTaxGraphQLService } from './product-class-tax-graphql.service';

@Component({
    selector: 'app-product-class-tax-list',
    templateUrl: './product-class-tax-list.component.html'
})
export class ProductClassTaxListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: ProductClassTaxGraphQLService
    ) {
        super(injector, graphQL);
    }
}

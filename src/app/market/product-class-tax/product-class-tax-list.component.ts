import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ProductClassTaxService } from './product-class-tax.service';
import { ProductClassTax } from '../market.models';

@Component({
    selector: 'app-product-class-tax-list',
    templateUrl: './product-class-tax-list.component.html'
})
export class ProductClassTaxListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected objectService: ProductClassTaxService
    ) {
        super(injector, objectService);
    }
}

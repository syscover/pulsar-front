import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ProductService } from './product.service';
import { Product } from '../market.models';

@Component({
    selector: 'ps-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'product.id', 'product_lang.name'
    ];
    objects: Product[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        // service for parent class
        protected injector: Injector,
        protected objectService: ProductService,
    ) {
        super(injector);
    }
}

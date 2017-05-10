import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ProductService } from './product.service';
import { Product } from '../market.models';
import { LangService } from './../../admin/lang/lang.service';
import { Lang } from './../../admin/admin.models';

@Component({
    selector: 'ps-product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'product.id', 'product_lang.name', 'lang.name'
    ];
    objects: Product[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected langService: LangService,

        // service for parent class
        protected injector: Injector,
        protected objectService: ProductService,
    ) {
        super(injector);
    }
}

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
    objects: ProductClassTax[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: ProductClassTaxService
    ) {
        super(injector);
        this.baseUri = objectService.baseUri;
    }
}

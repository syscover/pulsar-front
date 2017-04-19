import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { CustomerClassTaxService } from './../customer-class-tax/customer-class-tax.service';
import { CustomerClassTax } from '../market.models';

@Component({
    selector: 'app-customer-class-tax-list',
    templateUrl: './customer-class-tax-list.component.html'
})
export class CustomerClassTaxListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];
    objects: CustomerClassTax[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: CustomerClassTaxService
    ) {
        super(injector);
    }

}

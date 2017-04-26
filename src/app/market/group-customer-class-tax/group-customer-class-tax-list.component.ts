import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { GroupCustomerClassTaxService } from './group-customer-class-tax.service';
import { GroupCustomerClassTax } from '../market.models';

@Component({
    selector: 'app-group-customer-class-tax-list',
    templateUrl: './group-customer-class-tax-list.component.html'
})
export class GroupCustomerClassTaxListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'group.name', 'customer_class_tax.name'
    ];
    objects: GroupCustomerClassTax[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: GroupCustomerClassTaxService
    ) {
        super(injector);
    }

}

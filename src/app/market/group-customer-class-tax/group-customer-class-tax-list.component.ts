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

    constructor(
        protected injector: Injector,
        protected objectService: GroupCustomerClassTaxService
    ) {
        super(injector, objectService);
    }
}

import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { CustomerGraphQLService } from './customer-graphql.service';

@Component({
    selector: 'ps-customer-list',
    templateUrl: './customer-list.component.html'
})
export class CustomerListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'customer.id', 'customer.name', 'customer.surname', 'customer.email'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGraphQLService
    ) {
        super(injector, graphQL);
    }
}

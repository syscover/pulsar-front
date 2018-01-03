import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { CustomerClassTaxGraphQLService } from './customer-class-tax-graphql.service';

@Component({
    selector: 'app-customer-class-tax-list',
    templateUrl: './customer-class-tax-list.component.html'
})
export class CustomerClassTaxListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerClassTaxGraphQLService
    ) {
        super(injector, graphQL);
    }
}

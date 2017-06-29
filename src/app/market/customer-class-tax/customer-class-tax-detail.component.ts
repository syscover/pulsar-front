import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CustomerClassTaxGraphQLService } from './customer-class-tax-graphql.service';

@Component({
    selector: 'app-customer-class-tax-detail',
    templateUrl: 'customer-class-tax-detail.component.html'
})
export class CustomerClassTaxDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerClassTaxGraphQLService,
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }
}

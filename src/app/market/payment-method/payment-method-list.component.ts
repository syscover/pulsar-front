import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { PaymentMethodGraphQLService } from './payment-method-graphql.service';

@Component({
    selector: 'ps-payment-method-list',
    templateUrl: './payment-method-list.component.html'
})
export class PaymentMethodListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'market_payment_method.object_id', 'market_payment_method.name'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: PaymentMethodGraphQLService,
    ) {
        super(injector, graphQL);
    }
}

import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { OrderGraphQLService } from './order-graphql.service';

@Component({
    selector: 'ps-order-detail',
    templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: OrderGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            customer_name: null,
            customer_surname: null,
        });
    }
}

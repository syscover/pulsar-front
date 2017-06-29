import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { OrderStatusGraphQLService } from './order-status-graphql.service';

@Component({
    selector: 'ps-order-status-detail',
    templateUrl: './order-status-detail.component.html'
})
export class OrderStatusDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: OrderStatusGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            name: ['', Validators.required ],
            active: null
        });
    }
}

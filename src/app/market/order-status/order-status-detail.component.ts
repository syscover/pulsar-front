import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { OrderStatusService } from './order-status.service';
import { OrderStatus } from '../market.models';

@Component({
    selector: 'ps-order-status-detail',
    templateUrl: './order-status-detail.component.html'
})
export class OrderStatusDetailComponent extends CoreDetailComponent {
    
    constructor(
        protected injector: Injector,
        protected objectService: OrderStatusService
    ) {
        super(injector, objectService);
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

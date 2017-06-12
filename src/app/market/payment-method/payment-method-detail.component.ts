import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod, OrderStatus } from './../market.models';

// custom imports
import { OrderStatusService } from './../order-status/order-status.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-payment-method-detail',
    templateUrl: './payment-method-detail.component.html'
})
export class PaymentMethodDetailComponent extends CoreDetailComponent implements OnInit {

    orderStatuses: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected objectService: PaymentMethodService,
        protected orderStatusService: OrderStatusService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        // load order status
        this.orderStatusService.searchRecords({
                'type': 'query',
                'lang': this.baseLang,
                'parameters': [
                    {
                        'command': 'where',
                        'column': 'order_status.active',
                        'operator': '=',
                        'value': true
                    },
                    {
                        'command': 'orderBy',
                        'operator': 'asc',
                        'column': 'order_status.name'
                    }
                ]
            })
            .subscribe((response) => {

                this.orderStatuses = _.map(<OrderStatus[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get order status

                this.orderStatuses.unshift({ label: 'Select a Order Status successful', value: '' });
            });

        super.init();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            order_status_successful_id: ['', Validators.required],
            name: ['', Validators.required ],
            minimum_price: '',
            maximum_price: '',
            sort: '',
            active: '',
            instructions: ''
        });
    }
}

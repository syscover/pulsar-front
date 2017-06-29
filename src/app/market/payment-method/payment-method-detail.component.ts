import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { PaymentMethodGraphQLService } from './payment-method-graphql.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-payment-method-detail',
    templateUrl: './payment-method-detail.component.html'
})
export class PaymentMethodDetailComponent extends CoreDetailComponent {

    orderStatuses: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: PaymentMethodGraphQLService
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {
        /*// load order status
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
            });*/

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

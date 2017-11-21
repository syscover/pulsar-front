import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { PaymentMethodGraphQLService } from './payment-method-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { OrderStatus } from './../market.models';

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

    createForm() {
        this.fg = this.fb.group({
            id: '',
            object_id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            order_status_successful_id: ['', Validators.required],
            name: ['', Validators.required ],
            minimum_price: null,
            maximum_price: null,
            sort: '',
            active: '',
            instructions: ''
        });
    }

    argumentsRelationsObject(): Object {
        let sqlOrderStatus = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            }
        ];

        return {
            sqlOrderStatus
        };
    }

    setRelationsData(data: any) {
        // set order statuses
        this.orderStatuses = _.map(<OrderStatus[]>data['marketOrderStatuses'], obj => {
            return { value: obj.object_id, label: obj.name };
        });
        this.orderStatuses.unshift({ label: 'Select a order status', value: '' });
    }
}

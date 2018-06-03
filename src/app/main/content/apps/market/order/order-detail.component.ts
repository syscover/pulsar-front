import { OrderStatus, PaymentMethod } from './../market.models';
import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { OrderGraphQLService } from './order-graphql.service';
import { Status } from './../../cms/cms.models';

@Component({
    selector: 'dh2-order-detail',
    templateUrl: 'order-detail.component.html',
    animations: fuseAnimations
})
export class OrderDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'MARKET.ORDER';
    objectTranslationGender = 'M';
    orderStatuses: OrderStatus[] = [];
    paymentMethods: PaymentMethod[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: OrderGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            ip: [{value: null, disabled: true}],
            status_id: [null, Validators.required],
            payment_method_id: [null, Validators.required],

            subtotal: [{value: null, disabled: true}],
            tax_amount: [{value: null, disabled: true}],
            shipping_amount: [{value: null, disabled: true}],
            total: [{value: null, disabled: true}],


            date: [{value: null, disabled: true}, Validators.required ],
            transaction_id: [{value: null, disabled: true}],
            tracking_id: null,
            customer_company: null,
            customer_tin: null,
            customer_name: null,
            customer_surname: null,
            customer_email: null,
            customer_mobile: null,
            
            
            
        });
    }

    argumentsRelationsObject(): Object 
    {
        const sqlOrderStatus = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            }
        ];

        const sqlPaymentMethod = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            }
        ];

        return {
            sqlOrderStatus,
            sqlPaymentMethod
        };
    }

    setRelationsData(data) 
    {
        // market order statuses
        this.orderStatuses = data.marketOrderStatuses;

        // market payment methods
        this.paymentMethods = data.marketPaymentMethods;
    }
}

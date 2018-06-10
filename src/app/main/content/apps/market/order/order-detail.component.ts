import { Component, Injector, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { OrderGraphQLService } from './order-graphql.service';
import { OrderStatus, PaymentMethod } from './../market.models';
import * as _ from 'lodash';

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

    // Products
    displayedColumnsOrderRow = ['name', 'quantity', 'subtotal'];
    dataSourceOrderRow = new MatTableDataSource();
    @ViewChild(MatSort) sortRow: MatSort;

    // Discounts
    displayedColumnsOrderDiscount = ['names', 'coupon_code', 'free_shipping'];
    dataSourceOrderDiscount = new MatTableDataSource();
    @ViewChild(MatSort) sortDiscount: MatSort;

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
            date: [{value: null, disabled: true}],
            status_id: [null, Validators.required],
            payment_method_id: [null, Validators.required],
            transaction_id: [{value: null, disabled: true}],
            comments: null,

            subtotal_with_discounts: [{value: null, disabled: true}],
            subtotal: [{value: null, disabled: true}],
            discount_amount: [{value: null, disabled: true}],
            tax_amount: [{value: null, disabled: true}],
            shipping_amount: [{value: null, disabled: true}],
            total: [{value: null, disabled: true}],

            customer_id: null,
            customer_name: null,
            customer_surname: null,
            customer_company: null,
            customer_tin: null,
            customer_email: [null, Validators.required],
            customer_mobile: null,

            has_gift: false,
            gift_from: null,
            gift_to: null,
            gift_message: null,
            gift_comments: null,


            tracking_id: null


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

        // market order rows
        this.dataSourceOrderRow.sort = this.sortRow;
        this.dataSourceOrderRow.data = data.coreObject.rows;

        // market order discounts
        this.dataSourceOrderDiscount.sort = this.sortDiscount;
        this.dataSourceOrderDiscount.data = data.coreObject.discounts;
    }
}

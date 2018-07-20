import { Component, Injector, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { OrderGraphQLService } from './order-graphql.service';
import { OrderRowInfoDialogComponent } from './order-row-info-dialog.component';
import { OrderStatus, PaymentMethod, Log } from './../market.models';
import { CustomerGroup } from '../../crm/crm.models';
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
    customerGroups: CustomerGroup[] = [];
    logs: Log[] = [];

    // Products
    displayedColumnsOrderRow = ['name', 'quantity', 'subtotal', 'data'];
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

            customer_id: [{value: null, disabled: true}],
            customer_group_id: [{value: null, disabled: true}],
            customer_name: [{value: null, disabled: true}],
            customer_surname: [{value: null, disabled: true}],
            customer_company: [{value: null, disabled: true}],
            customer_tin: [{value: null, disabled: true}],
            customer_email: [{value: null, disabled: true}, Validators.required],
            customer_mobile: [{value: null, disabled: true}],
            customer_phone: [{value: null, disabled: true}],

            has_shipping: false,
            shipping_tracking_id: null,
            shipping_company: null,
            shipping_name: null,
            shipping_surname: null,
            shipping_email: null,
            shipping_mobile: null,
            shipping_phone: null,
            shipping_country_id: null,
            shipping_territorial_area_1_id: null,
            shipping_territorial_area_2_id: null,
            shipping_territorial_area_3_id: null,
            shipping_zip: null,
            shipping_locality: null,
            shipping_address: null,
            shipping_latitude: null,
            shipping_longitude: null,
            shipping_comments: null,

            has_invoice: false,
            invoiced: false,
            invoice_number: null,
            invoice_company: null,
            invoice_tin: null,
            invoice_name: null,
            invoice_surname: null,
            invoice_email: null,
            invoice_mobile: null,
            invoice_phone: null,
            invoice_country_id: null,
            invoice_territorial_area_1_id: null,
            invoice_territorial_area_2_id: null,
            invoice_territorial_area_3_id: null,
            invoice_zip: null,
            invoice_locality: null,
            invoice_address: null,
            invoice_latitude: null,
            invoice_longitude: null,
            invoice_comments: null,

            has_gift: false,
            gift_from: null,
            gift_to: null,
            gift_message: null,
            gift_comments: null
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

        // crm customer groups
        this.customerGroups = data.crmCustomerGroups;

        // market order rows
        this.dataSourceOrderRow.sort = this.sortRow;
        this.dataSourceOrderRow.data = data.coreObject.rows;

        // market order discounts
        this.dataSourceOrderDiscount.sort = this.sortDiscount;
        this.dataSourceOrderDiscount.data = data.coreObject.discounts;

        // set logs of order
        this.logs = data.coreObject.data.logs;
    }

    showInfo(info: any)
    {
        if (this.env.debug) console.log('DEBUG - Show info order row: ', info);

        this.dialog.open(OrderRowInfoDialogComponent, {
            data: {
                info: info
            },
            width: '80vw'
        });
    }
}

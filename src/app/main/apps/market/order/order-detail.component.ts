import { Component, Injector, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { OrderRowInfoDialogComponent } from './order-row-info-dialog.component';
import { OrderStatus, PaymentMethod, Log } from '../market.models';
import { CustomerGroup } from '../../crm/crm.models';
import { graphQL } from './order.graphql';

@Component({
    selector: 'dh2-market-order-detail',
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
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({

            id: [{value: '', disabled: true}],
            ip: [{value: '', disabled: true}],
            date: [{value: '', disabled: true}],
            status_id: ['', Validators.required],
            payment_method_id: ['', Validators.required],
            transaction_id: [{value: '', disabled: true}],
            comments: '',

            subtotal_with_discounts: [{value: '', disabled: true}],
            subtotal: [{value: '', disabled: true}],
            discount_amount: [{value: '', disabled: true}],
            tax_amount: [{value: '', disabled: true}],
            shipping_amount: [{value: '', disabled: true}],
            total: [{value: '', disabled: true}],

            customer_id: [{value: '', disabled: true}],
            customer_group_id: [{value: '', disabled: true}],
            customer_name: [{value: '', disabled: true}],
            customer_surname: [{value: '', disabled: true}],
            customer_company: [{value: '', disabled: true}],
            customer_tin: [{value: '', disabled: true}],
            customer_email: [{value: '', disabled: true}, Validators.required],
            customer_mobile: [{value: '', disabled: true}],
            customer_phone: [{value: '', disabled: true}],

            has_shipping: false,
            shipping_tracking_id: '',
            shipping_company: '',
            shipping_name: '',
            shipping_surname: '',
            shipping_email: '',
            shipping_mobile: '',
            shipping_phone: '',
            shipping_country_id: '',
            shipping_territorial_area_1_id: '',
            shipping_territorial_area_2_id: '',
            shipping_territorial_area_3_id: '',
            shipping_zip: '',
            shipping_locality: '',
            shipping_address: '',
            shipping_latitude: '',
            shipping_longitude: '',
            shipping_comments: '',

            has_invoice: false,
            invoiced: false,
            invoice_number: '',
            invoice_company: '',
            invoice_tin: '',
            invoice_name: '',
            invoice_surname: '',
            invoice_email: '',
            invoice_mobile: '',
            invoice_phone: '',
            invoice_country_id: '',
            invoice_territorial_area_1_id: '',
            invoice_territorial_area_2_id: '',
            invoice_territorial_area_3_id: '',
            invoice_zip: '',
            invoice_locality: '',
            invoice_address: '',
            invoice_latitude: '',
            invoice_longitude: '',
            invoice_comments: '',

            has_gift: false,
            gift_from: '',
            gift_to: '',
            gift_message: '',
            gift_comments: ''
        });
    }

    argumentsRelationsObject(): object
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

    setRelationsData(data): void
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

    showInfo(info: any): void
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

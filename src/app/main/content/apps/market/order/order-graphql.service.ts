import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class OrderGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query MarketGetOrdersPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketOrdersPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject  = gql`
        query MarketGetRelationsOrder ($sqlOrderStatus:[CoreSQLQueryInput] $sqlPaymentMethod:[CoreSQLQueryInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetOrders ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketOrders (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetOrder ($sql:[CoreSQLQueryInput] $sqlOrderStatus:[CoreSQLQueryInput] $sqlPaymentMethod:[CoreSQLQueryInput]) {
            coreObject: marketOrder (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation MarketAddOrder ($object:MarketOrderInput!) {
            marketAddOrder (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateOrder ($object:MarketOrderInput!) {
            marketUpdateOrder (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteOrder ($id:Int!) {
            marketDeleteOrder (id:$id){
                ${this.fields}
            }
        }`;

    init() 
    {
        this.model = 'Syscover\\Market\\Models\\Order';
        this.table = 'market_order';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketOrder {
                id
                date
                payment_method_id
                status_id
                ip
                transaction_id
                comments
                rows {
                    id
                    name
                    quantity
                    subtotal
                    data
                }
                discounts {
                    id
                    names
                    coupon_code
                    free_shipping
                    discount_amount
                }
                customer_id
                customer_group_id
                customer_company
                customer_tin
                customer_name
                customer_surname
                customer_email
                customer_mobile
                subtotal
                subtotal_with_discounts
                discount_amount
                tax_amount
                shipping_amount
                total
                has_shipping
                shipping_tracking_id
                shipping_company
                shipping_name
                shipping_surname
                shipping_email
                shipping_mobile
                shipping_phone
                shipping_country_id
                shipping_territorial_area_1_id
                shipping_territorial_area_2_id
                shipping_territorial_area_3_id
                shipping_zip
                shipping_locality
                shipping_address
                shipping_latitude
                shipping_longitude
                shipping_comments
                has_invoice
                invoiced
                invoice_number
                invoice_company
                invoice_tin
                invoice_name
                invoice_surname
                invoice_email
                invoice_mobile
                invoice_phone
                invoice_country_id
                invoice_territorial_area_1_id
                invoice_territorial_area_2_id
                invoice_territorial_area_3_id
                invoice_zip
                invoice_locality
                invoice_address
                invoice_latitude
                invoice_longitude
                invoice_comments
                has_gift
                gift_from
                gift_to
                gift_message
                gift_comments
            }
        `;

        this.relationsFields = `
            marketOrderStatuses (sql:$sqlOrderStatus) {
                ix
                id
                lang_id
                name
                active
                data_lang
            }
            marketPaymentMethods (sql:$sqlPaymentMethod) {
                ix
                id
                lang_id
                name
                sort
                active
            }
            crmCustomerGroups {
                id
                name
            }
        `;

        super.init();
    }
}

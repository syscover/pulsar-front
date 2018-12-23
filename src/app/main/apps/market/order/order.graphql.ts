import gql from 'graphql-tag';
import { graphQL as marketOrderStatus } from './../order-status/order-status.graphql';
import { graphQL as marketPaymentMethod } from './../payment-method/payment-method.graphql';
import { graphQL as crmCustomerGroup } from './../../crm/customer-group/customer-group.graphql';

const fields = `
    id
    date
    payment_method_id
    payment_methods {
        ${marketPaymentMethod.fields}
    }
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
        cost
        total_cost
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
    data
`;

const relationsFields = `
    marketOrderStatuses (sql:$sqlOrderStatus) {
        ${marketOrderStatus.fields}
    }
    marketPaymentMethods (sql:$sqlPaymentMethod) {
        ${marketPaymentMethod.fields}
    }
    crmCustomerGroups {
        ${crmCustomerGroup.fields}
    }
`;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\Order',
    table: 'market_order',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetOrdersPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketOrdersPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject : gql`
        query MarketGetRelationsOrder ($sqlOrderStatus:[CoreSQLInput] $sqlPaymentMethod:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetOrders ($sql:[CoreSQLInput]) {
            coreObjects: marketOrders (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetOrder ($sql:[CoreSQLInput] $sqlOrderStatus:[CoreSQLInput] $sqlPaymentMethod:[CoreSQLInput]) {
            coreObject: marketOrder (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateOrder ($payload:MarketOrderInput!) {
            marketCreateOrder (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateOrder ($payload:MarketOrderInput!) {
            marketUpdateOrder (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteOrder ($id:Int!) {
            marketDeleteOrder (id:$id) {
                ${fields}
            }
        }`
};

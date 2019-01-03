import gql from 'graphql-tag';
import { graphQL as marketOrderStatus } from '../order-status/order-status.graphql';

const fields = `
    ix
    id
    lang_id 
    name
    order_status_successful_id
    minimum_price
    maximum_price
    instructions
    sort
    active
    data_lang
`;

const relationsFields = `
    marketOrderStatuses (sql:$sqlOrderStatus) {
        ${marketOrderStatus.fields}
    }
`;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\PaymentMethod',
    table: 'market_payment_method',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetPaymentMethodsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: marketPaymentMethodsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject : gql`
        query MarketGetRelationsPaymentMethod ($sqlOrderStatus:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetPaymentMethods ($sql:[CoreSQLInput] $sqlOrderStatus:[CoreSQLInput]) {
            coreObjects: marketPaymentMethods (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query MarketGetPaymentMethod ($sql:[CoreSQLInput] $sqlOrderStatus:[CoreSQLInput]) {
            coreObject: marketPaymentMethod (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateAction ($payload:MarketPaymentMethodInput!) {
            marketCreatePaymentMethod (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdatePaymentMethod ($payload:MarketPaymentMethodInput!) {
            marketUpdatePaymentMethod (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeletePaymentMethod ($lang_id:String! $id:Int!) {
            marketDeletePaymentMethod (lang_id:$lang_id id:$id) {
                ${fields}
            }
        }`
};

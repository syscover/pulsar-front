import gql from 'graphql-tag';

const fields = `
    ix
    id
    lang_id
    name
    active
    data_lang
`;

const relationsFields = ``;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\OrderStatus',
    table: 'market_order_status',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetOrderStatusesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: marketOrderStatusesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query MarketGetOrderStatuses ($sql:[CoreSQLInput]) {
            coreObjects: marketOrderStatuses (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetOrderStatus ($sql:[CoreSQLInput]) {
            coreObject: marketOrderStatus (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateOrderStatus ($payload:MarketOrderStatusInput!) {
            marketCreateOrderStatus (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateOrderStatus ($payload:MarketOrderStatusInput!) {
            marketUpdateOrderStatus (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteOrderStatus ($lang_id:String! $id:Int!) {
            marketDeleteOrderStatus (lang_id:$lang_id id:$id) {
                ${fields}
            }
        }`
};

import gql from 'graphql-tag';

const fields = `
    id
    name
    temporary
    flow_config {
        landing_page_type
        bank_txn_pending_url
        user_action
        return_uri_http_method
    }
    input_fields {
        allow_note
        no_shipping
        address_override
    }
    presentation {
        brand_name
        logo_image
        locale_code
        return_url_label
        note_to_seller_label
    }
`;

const relationsFields = ``;

export const graphQL = {

    // model: 'Syscover\\Market\\Models\\Section',
    table: 'market_paypal_web_profile',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetPaypalWebProfilesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketPaypalWebProfilesPagination (sql:$sql) {
                total
                objects
                filtered
            }
        }`,

    queryObjects: gql`
        query MarketGetPaypalWebProfiles ($sql:[CoreSQLInput]) {
            coreObjects: marketPaypalWebProfiles (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetPaypalWebProfile ($sql:[CoreSQLInput]) {
            coreObject: marketPaypalWebProfile (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation MarketCreatePaypalWebProfile ($payload:MarketPaypalWebProfileInput!) {
            marketCreatePaypalWebProfile (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdatePaypalWebProfile ($payload:MarketPaypalWebProfileInput!) {
            marketUpdatePaypalWebProfile (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeletePaypalWebProfile ($id:String!) {
            marketDeletePaypalWebProfile (id:$id) {
                ${fields}
            }
        }`
};

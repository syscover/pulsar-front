import gql from 'graphql-tag';

const fields = `
    id
    name 
`;

const relationsFields = ``;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\CustomerClassTax',
    table: 'market_customer_class_tax',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetCustomerClassTaxesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketCustomerClassTaxesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query MarketGetCustomerClassTaxes ($sql:[CoreSQLInput]) {
            coreObjects: marketCustomerClassTaxes (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetCustomerClassTax ($sql:[CoreSQLInput]) {
            coreObject: marketCustomerClassTax (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateCustomerClassTax ($payload:MarketCustomerClassTaxInput!) {
            marketCreateCustomerClassTax (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateCustomerClassTax ($payload:MarketCustomerClassTaxInput!) {
            marketUpdateCustomerClassTax (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteCustomerClassTax ($id:Int!) {
            marketDeleteCustomerClassTax (id:$id) {
                ${fields}
            }
        }`
};

import gql from 'graphql-tag';

const fields = `
    id
    name
`;

const relationsFields = ``;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\ProductClassTax',
    table: 'market_product_class_tax',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetProductClassTaxesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketProductClassTaxesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query MarketGetProductClassTaxes ($sql:[CoreSQLInput]) {
            coreObjects: marketProductClassTaxes (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetProductClassTax ($sql:[CoreSQLInput]) {
            coreObject: marketProductClassTax (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateProductClassTax ($payload:MarketProductClassTaxInput!) {
            marketCreateProductClassTax (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateProductClassTax ($payload:MarketProductClassTaxInput!) {
            marketUpdateProductClassTax (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteProductClassTax ($id:Int!) {
            marketDeleteProductClassTax (id:$id) {
                ${fields}
            }
        }`
};

import gql from 'graphql-tag';

const fields = `
    warehouse_id
    product_id
    stock
    minimum_stock
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Market\\Models\\Stock',
    table: 'market_stock',
    fields,
    relationsFields,

    mutationSetStock: gql`
        mutation MarketSetStock ($payload:MarketStockInput!) {
            marketSetStock (payload:$payload){
                ${fields}
            }
        }`

};

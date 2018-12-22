import gql from 'graphql-tag';
import { graphQL as adminCountry } from './../../admin/country/country.graphql';

const fields = `
    id
    name
    country_id
    territorial_area_1_id
    territorial_area_2_id
    territorial_area_3_id
    zip
    locality
    address
    latitude
    longitude
    active
`;

const relationsFields = `
    adminCountries (sql:$sqlCountry) {
        ${adminCountry.fields}
    }
`;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\Warehouse',
    table: 'market_warehouse',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetWarehousesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketWarehousesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject : gql`
        query marketGetRelationsWarehouse ($sqlCountry:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetWarehouses ($sql:[CoreSQLInput]) {
            coreObjects: marketWarehouses (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetWarehouse ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: marketWarehouse (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateWarehouse ($payload:MarketWarehouseInput!) {
            marketCreateWarehouse (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateWarehouse ($payload:MarketWarehouseInput!) {
            marketUpdateWarehouse (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteWarehouse ($id:Int!) {
            marketDeleteWarehouse (id:$id) {
                ${fields}
            }
        }`
};

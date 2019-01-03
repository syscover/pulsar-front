import gql from 'graphql-tag';
import { graphQL as adminCountry } from '../../admin/country/country.graphql';

const fields = `
    id
    name
    country_id
    territorial_area_1_id
    territorial_area_2_id
    territorial_area_3_id
    zip
    tax_rate
`;

const relationsFields = `
    adminCountries (sql:$sqlCountry) {
        ${adminCountry.fields}
    }
`;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\TaxRateZone',
    table: 'market_tax_rate_zone',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetTaxRateZonesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketTaxRateZonesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject : gql`
        query MarketRelationsTaxRateZone ($sqlCountry:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetTaxRateZones ($sql:[CoreSQLInput]) {
            coreObjects: marketTaxRateZones (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetTaxRateZone ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: marketTaxRateZone (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateTaxRateZone ($payload:MarketTaxRateZoneInput!) {
            marketCreateTaxRateZone (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateTaxRateZone ($payload:MarketTaxRateZoneInput!) {
            marketUpdateTaxRateZone (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteTaxRateZone ($id:Int!) {
            marketDeleteTaxRateZone (id:$id) {
                ${fields}
            }
        }`
};

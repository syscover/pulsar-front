import gql from 'graphql-tag';
import { graphQL as marketTaxRateZone } from './../tax-rate-zone/tax-rate-zone.graphql';
import { graphQL as marketCustomerClassTax } from './../customer-class-tax/customer-class-tax.graphql';
import { graphQL as marketProductClassTax } from './../product-class-tax/product-class-tax.graphql';

const fields = `
    id
    name
    translation
    priority
    sort
    tax_rate_zones {
        ${marketTaxRateZone.fields}
    }
    customer_class_taxes {
        ${marketCustomerClassTax.fields}
    }
    product_class_taxes {
        ${marketProductClassTax.fields}
    }
`;

const relationsFields = `
    marketTaxRateZones {
        ${marketTaxRateZone.fields}
    }
    marketCustomerClassTaxes {
        ${marketCustomerClassTax.fields}
    }
    marketProductClassTaxes {
        ${marketProductClassTax.fields}
    }
`;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\TaxRule',
    table: 'market_tax_rule',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetTaxRulesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketTaxRulesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject : gql`
        query MarketGetRelationsTaxRule {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetTaxRules ($sql:[CoreSQLInput]) {
            coreObjects: marketTaxRules (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetTaxRule ($sql:[CoreSQLInput]) {
            coreObject: marketTaxRule (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateTaxRule ($payload:MarketTaxRuleInput!) {
            marketCreateTaxRule (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateTaxRule ($payload:MarketTaxRuleInput!) {
            marketUpdateTaxRule (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteTaxRule ($id:Int!) {
            marketDeleteTaxRule (id:$id) {
                ${fields}
            }
        }`
};

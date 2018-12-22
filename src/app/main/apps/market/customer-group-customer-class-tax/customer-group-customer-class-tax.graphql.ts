import gql from 'graphql-tag';
import { graphQL as marketCustomerClassTax } from './../customer-class-tax/customer-class-tax.graphql';
import { graphQL as crmCustomerGroup } from './../../crm/customer-group/customer-group.graphql';

const fields = `
    customer_group_id
    customer_class_tax_id 
`;

const relationsFields = `
    crmCustomerGroups {
        ${crmCustomerGroup.fields}
    }
    marketCustomerClassTaxes {
        ${marketCustomerClassTax.fields}
    }
`;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\CustomerGroupCustomerClassTax',
    table: 'market_customer_group_customer_class_tax',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetCustomerGroupsCustomerClassTaxesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketCustomerGroupsCustomerClassTaxesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject : gql`
        query MarketGetRelationsArticle {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetCustomerGroupsCustomerClassTaxes ($sql:[CoreSQLInput]) {
            coreObjects: marketCustomerGroupsCustomerClassTaxes (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query MarketGetCustomerGroupCustomerClassTax ($sql:[CoreSQLInput]) {
            coreObject: marketCustomerGroupCustomerClassTax (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateCustomerGroupCustomerClassTax ($payload:MarketCustomerGroupCustomerClassTaxInput!) {
            marketCreateCustomerGroupCustomerClassTax (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateCustomerGroupCustomerClassTax ($customer_group_id:Int! $customer_class_tax_id:Int! $payload:MarketCustomerGroupCustomerClassTaxInput!) {
            marketUpdateCustomerGroupCustomerClassTax (customer_group_id:$customer_group_id customer_class_tax_id:$customer_class_tax_id payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteCustomerGroupCustomerClassTax ($customer_group_id:Int! $customer_class_tax_id:Int!) {
            marketDeleteCustomerGroupCustomerClassTax (customer_group_id:$customer_group_id customer_class_tax_id:$customer_class_tax_id) {
                ${fields}
            }
        }`
};

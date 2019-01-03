import gql from 'graphql-tag';
import { graphQL as crmCustomerGroupGraphQL } from '../customer-group/customer-group.graphql';
import { graphQL as crmAddressGraphQL } from '../address/address.graphql';
import { graphQL as adminCountryGraphQL } from '../../admin/country/country.graphql';

const fields = `
    id
    group_id
    group {
        ${crmCustomerGroupGraphQL.fields}
    }
    company
    tin
    name
    surname
    email
    user
    active
    addresses {
        ${crmAddressGraphQL.fields}
    }
    country_id
    territorial_area_1_id
    territorial_area_2_id
    territorial_area_3_id
    zip
    locality
    address
    latitude
    longitude
`;

const relationsFields = `
    crmCustomerGroups {
        ${crmCustomerGroupGraphQL.fields}
    }
    adminCountries (sql:$sqlCountry) {
        ${adminCountryGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Crm\\Models\\Customer',
    table: 'crm_customer',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query CrmGetCustomersPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: crmCustomersPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query CrmGetRelationsCustomer ($sqlCountry:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query CrmGetCustomers ($sql:[CoreSQLInput]) {
            coreObjects: crmCustomers (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query CrmGetCustomer(
            $sql:[CoreSQLInput]
            $sqlCountry:[CoreSQLInput]
        ) {
            coreObject: crmCustomer (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation CrmCreateCustomer ($payload:CrmCustomerInput!) {
            crmCreateCustomer (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation CrmUpdateCustomer ($payload:CrmCustomerInput!) {
            crmUpdateCustomer (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation CrmDeleteCustomer ($id:Int!) {
            crmDeleteCustomer (id:$id) {
                ${fields}
            }
        }`
};

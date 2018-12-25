import gql from 'graphql-tag';
import { graphQL as crmAddressTypeGraphQL } from './../address-type/address-type.graphql';

const fields = `
    id
    type_id
    type {
        ${crmAddressTypeGraphQL.fields}
    }
    alias
    company
    tin
    name
    surname
    email
    address
    country_id
    territorial_area_1_id
    territorial_area_2_id
    territorial_area_3_id
    zip
    locality
    latitude
    longitude
`;

const relationsFields = `
`;

export const graphQL = {
    model: 'Syscover\\Crm\\Models\\Address',
    table: 'crm_address',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query CrmGetAdressesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: crmAdressesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query CrmGetAdresses ($sql:[CoreSQLInput]) {
            coreObjects: crmAdresses (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query CrmGetAdress ($sql:[CoreSQLInput]) {
            coreObject: crmAdress (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation CrmCreateAdress ($payload:CrmAdressInput!) {
            crmCreateAdress (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation CrmUpdateAdress ($payload:CrmAdressInput!) {
            crmUpdateAdress (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation CrmDeleteAdress ($id:Int!) {
            crmDeleteAdress (id:$id) {
                ${fields}
            }
        }`
};
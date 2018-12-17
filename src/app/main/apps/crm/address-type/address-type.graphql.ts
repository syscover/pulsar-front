import gql from 'graphql-tag';

const fields = `
    id
    name
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Crm\\Models\\AddressType',
    table: 'crm_address_type',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query CrmGetAddressTypesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: crmAddressTypesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query CrmGetAddressTypes ($sql:[CoreSQLInput]) {
            coreObjects: crmAddressTypes (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query CrmGetAddressType ($sql:[CoreSQLInput]) {
            coreObject: crmAddressType (sql:$sql){
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation CrmCreateAddressType ($payload:CrmAddressTypeInput!) {
            crmCreateAddressType (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation CrmUpdateAddressType ($payload:CrmAddressTypeInput!) {
            crmUpdateAddressType (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation CrmDeleteAddressType ($id:Int!) {
            crmDeleteAddressType (id:$id){
                ${fields}
            }
        }`
};


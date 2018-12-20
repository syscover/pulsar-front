import gql from 'graphql-tag';

const fields = `
    id
    name
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Crm\\Models\\CustomerGroup',
    table: 'crm_customer_group',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query CrmGetCustomerGroupsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: crmCustomerGroupsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query CrmGetCustomerGroups ($sql:[CoreSQLInput]) {
            coreObjects: crmCustomerGroups (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query CrmGetCustomerGroup ($sql:[CoreSQLInput]) {
            coreObject: crmCustomerGroup (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation CrmCreateCustomerGroup ($payload:CrmCustomerGroupInput!) {
            crmCreateCustomerGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation CrmUpdateCustomerGroup ($payload:CrmCustomerGroupInput!) {
            crmUpdateCustomerGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation CrmDeleteCustomerGroup ($id:Int!) {
            crmDeleteCustomerGroup (id:$id) {
                ${fields}
            }
        }`
};

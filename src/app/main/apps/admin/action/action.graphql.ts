import gql from 'graphql-tag';

const fields = `
    ix
    id
    name
`;

const relationsFields = `
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Action',
    table: 'admin_action',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetActionsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminActionsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query AdminGetActions ($sql:[CoreSQLInput]) {
            coreObjects: adminActions (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetAction ($sql:[CoreSQLInput]) {
            coreObject: adminAction (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateAction ($payload:AdminActionInput!) {
            adminCreateAction (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateAction ($payload:AdminActionInput!) {
            adminUpdateAction (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteAction ($id:String!) {
            adminDeleteAction (id:$id) {
                ${fields}
            }
        }`
};

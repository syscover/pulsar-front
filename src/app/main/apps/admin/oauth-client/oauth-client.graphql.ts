import gql from 'graphql-tag';

const fields = `
    id
    user_id
    name
    secret
    redirect
    personal_access_client
    password_client
    revoked
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\OAuthClient',
    table: 'oauth_clients',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetOAuthClientsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminOAuthClientsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query AdminGetOAuthClients ($sql:[CoreSQLInput]) {
            coreObjects: adminOAuthClients (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetOAuthClient ($sql:[CoreSQLInput]) {
            coreObject: adminOAuthClient (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateOAuthClient ($payload:AdminOAuthClientInput!) {
            adminCreateOAuthClient (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateOAuthClient ($payload:AdminOAuthClientInput!) {
            adminUpdateOAuthClient (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteOAuthClient ($id:String!) {
            adminDeleteOAuthClient (id:$id) {
                ${fields}
            }
        }`
};

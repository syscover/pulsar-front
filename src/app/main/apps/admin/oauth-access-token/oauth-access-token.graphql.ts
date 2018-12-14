import gql from 'graphql-tag';

const fields = `
    id 
    user_id
    name
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\OAuthAccessToken',
    table: 'oauth_access_tokens',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetOAuthClientsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminOAuthAccessTokensPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query AdminGetOAuthAccessTokens ($sql:[CoreSQLInput]) {
            coreObjects: adminOAuthAccessTokens (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetOAuthAccessToken ($sql:[CoreSQLInput]) {
            coreObject: adminOAuthAccessToken (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateOAuthAccessToken ($payload:AdminOAuthAccessTokenInput!) {
            adminCreateOAuthAccessToken (payload:$payload) {
                ... on AdminOAuthPersonalAccessTokenResult {
                    accessToken
                    token {
                        id
                        user_id
                        name
                    }
                }
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateOAuthAccessToken ($payload:AdminOAuthAccessTokenInput!) {
            adminUpdateOAuthAccessToken (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteOAuthAccessToken ($id:String!) {
            adminDeleteOAuthAccessToken (id:$id) {
                ${fields}
            }
        }`
};

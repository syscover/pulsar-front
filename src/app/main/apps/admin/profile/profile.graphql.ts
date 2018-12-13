import gql from 'graphql-tag';

const fields = `
    id 
    name
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Profile',
    table: 'admin_profile',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetProfilesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminProfilesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query AdminGetProfiles ($sql:[CoreSQLInput]) {
            coreObjects: adminProfiles (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetProfile ($sql:[CoreSQLInput]) {
            coreObject: adminProfile (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateProfile ($payload:AdminProfileInput!) {
            adminCreateProfile (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateProfile ($payload:AdminProfileInput!) {
            adminUpdateProfile (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteProfile ($id:Int!) {
            adminDeleteProfile (id:$id) {
                ${fields}
            }
        }`
};

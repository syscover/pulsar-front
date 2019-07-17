import gql from 'graphql-tag';

const fields = `
    id
    name
    publish
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Profile',
    table: 'forem_profile',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetProfilesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremProfilesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query ForemGetProfiles ($sql:[CoreSQLInput]) {
            coreObjects: foremProfiles (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ForemGetProfile ($sql:[CoreSQLInput]) {
            coreObject: foremProfile (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateProfile ($payload:ForemProfileInput!) {
            foremCreateProfile (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateProfile ($payload:ForemProfileInput!) {
            foremUpdateProfile (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteProfile ($id:Int!) {
            foremDeleteProfile (id:$id) {
                ${fields}
            }
        }`
};

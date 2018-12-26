import gql from 'graphql-tag';

const fields = `
    id
    code
    name
    year
    starts_at
    ends_at
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Expedient',
    table: 'forem_expedient',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetExpedientsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremExpedientsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query ForemGetExpedients ($sql:[CoreSQLInput]) {
            coreObjects: foremExpedients (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ForemGetExpedient ($sql:[CoreSQLInput]) {
            coreObject: foremExpedient (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateExpedient ($payload:ForemExpedientInput!) {
            foremCreateExpedient (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateExpedient ($payload:ForemExpedientInput!) {
            foremUpdateExpedient (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteExpedient ($id:Int!) {
            foremDeleteExpedient (id:$id) {
                ${fields}
            }
        }`
};

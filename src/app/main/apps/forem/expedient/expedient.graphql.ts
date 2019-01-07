import gql from 'graphql-tag';

const fields = `
    id
    modality_id
    year
    name
    starts_at
    ends_at
`;

const relationsFields = `
    foremModalities: coreConfig (config:$configModalities)
`;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Expedient',
    table: 'forem_expedient',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetExpedientsPagination ($sql:[CoreSQLInput] $configModalities:CoreConfigInput) {
            coreObjectsPagination: foremExpedientsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
            ${relationsFields}
        }`,

    queryRelationsObject: gql`
        query ForemGetRelationsModality ($configModalities:CoreConfigInput) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ForemGetExpedients ($sql:[CoreSQLInput] $configModalities:CoreConfigInput) {
            coreObjects: foremExpedients (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query ForemGetExpedient ($sql:[CoreSQLInput] $configModalities:CoreConfigInput) {
            coreObject: foremExpedient (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
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

import gql from 'graphql-tag';

const fields = `
    id
    subject
    emails
    filename
    extension
    frequency_id
    sql
`;

const relationsFields = `
    adminExtensions: coreConfig (config:$configExtensions)
    adminFrequencies: coreConfig (config:$configFrequencies)
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Report',
    table: 'admin_report',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetReportsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminReportsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsReport ($configExtensions:CoreConfigInput! $configFrequencies:CoreConfigInput!) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetReports ($sql:[CoreSQLInput]) {
            coreObjects: adminReports (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetReport ($sql:[CoreSQLInput] $configExtensions:CoreConfigInput! $configFrequencies:CoreConfigInput!) {
            coreObject: adminReport (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateReport ($payload:AdminReportInput!) {
            adminCreateReport (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateReport ($payload:AdminReportInput!) {
            adminUpdateReport (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteReport ($id:Int!) {
            adminDeleteReport (id:$id) {
                ${fields}
            }
        }`
};

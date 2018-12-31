import gql from 'graphql-tag';

const fields = `
    id
    subject
    emails
    cc
    schedule_frequency
    filename
    extension
    sql
`;

const relationsFields = ``;

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

    queryObjects: gql`
        query AdminGetReports ($sql:[CoreSQLInput]) {
            coreObjects: adminReports (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetReport ($sql:[CoreSQLInput]) {
            coreObject: adminReport (sql:$sql) {
                ${fields}
            }
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

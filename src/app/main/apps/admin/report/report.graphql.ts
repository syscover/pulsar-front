import gql from 'graphql-tag';

const fields = `
    id
    subject
    emails
    profiles
    filename
    extension
    frequency_id
    wildcards
    statement
    sql
`;

const relationsFields = `
    coreConfigFieldTypes:coreConfig (config:$configFieldTypes)
    coreConfigDataTypes:coreConfig (config:$configDataTypes)
    adminConfigExtensions: coreConfig (config:$configExtensions)
    adminConfigFrequencies: coreConfig (config:$configFrequencies)
    adminConfigReportRelations: coreConfig (config:$configReportRelations)
    adminProfiles {
        id
        name
    }
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Report',
    table: 'admin_report',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetReportsPagination ($sql:[CoreSQLInput] $filters:[CoreSQLInput]) {
            coreObjectsPagination: adminReportsPagination (sql:$sql filters:$filters) {
                total
                objects (sql:$sql filters:$filters)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsReport (
            $configFieldTypes:CoreConfigInput! 
            $configDataTypes:CoreConfigInput!
            $configExtensions:CoreConfigInput! 
            $configFrequencies:CoreConfigInput!
            $configReportRelations:CoreConfigInput!
        ) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetReports (
            $sql:[CoreSQLInput]
            $configFieldTypes:CoreConfigInput! 
            $configDataTypes:CoreConfigInput!
            $configExtensions:CoreConfigInput! 
            $configFrequencies:CoreConfigInput!
            $configReportRelations:CoreConfigInput!
        ) {
            coreObjects: adminReports (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetReport (
            $sql:[CoreSQLInput]
            $configFieldTypes:CoreConfigInput! 
            $configDataTypes:CoreConfigInput!
            $configExtensions:CoreConfigInput! 
            $configFrequencies:CoreConfigInput!
            $configReportRelations:CoreConfigInput!
        ) {
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
        }`,

    // custom query
    mutationRunReport: gql`
        mutation AdminRunReport ($id:Int!) {
            adminRunReport (id:$id) {
                url
                filename
                pathname
                mime
                size
            }
        }`
};

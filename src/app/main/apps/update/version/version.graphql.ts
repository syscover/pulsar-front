import gql from 'graphql-tag';
import { graphQL as adminVersionGraphQL } from '../../admin/package/package.graphql';

const fields = `
    id
    name
    package_id
    package {
        ${adminVersionGraphQL.fields}
    }
    version
    publish
`;

const relationsFields = `
    adminVersions {
        ${adminVersionGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Update\\Models\\Version',
    table: 'update_versions',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query UpdateGetVersionsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: updateVersionsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query UpdateGetVersions ($sql:[CoreSQLInput]) {
            coreObjects: updateVersions (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query UpdateGetVersion ($sql:[CoreSQLInput]) {
            coreObject: updateVersion (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation UpdateCreateVersion ($payload:UpdateVersionInput!) {
            updateCreateVersion (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation UpdateUpdateVersion ($payload:UpdateVersionInput!) {
            updateUpdateVersion (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation UpdateDeleteVersion ($id:Int!) {
            updateDeleteVersion (id:$id) {
                ${fields}
            }
        }`
};

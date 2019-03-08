import gql from 'graphql-tag';
import { graphQL as adminPackageGraphQL } from '../../admin/package/package.graphql';

const fields = `
    id
    name
    package_id
    package {
        ${adminPackageGraphQL.fields}
    }
    version
    minimal_panel_version
    composer
    publish
    migration
    query
    provide
    provide_from
`;

const relationsFields = `
    adminPackages {
        ${adminPackageGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Update\\Models\\Version',
    table: 'update_version',
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

    queryRelationsObject: gql`
        query UpdateGetRelationsResource {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query UpdateGetVersions ($sql:[CoreSQLInput]) {
            coreObjects: updateVersions (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query UpdateGetVersion ($sql:[CoreSQLInput]) {
            coreObject: updateVersion (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
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

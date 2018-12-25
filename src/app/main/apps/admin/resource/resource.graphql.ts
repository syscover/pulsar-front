import gql from 'graphql-tag';
import { graphQL as adminPackageGraphQL } from './../package/package.graphql';

const fields = `   
    ix
    id
    name 
    package_id
    package {
        ${adminPackageGraphQL.fields}
    }
`;

const relationsFields = `
    adminPackages {
        ${adminPackageGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Resource',
    table: 'admin_resource',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetResourcesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminResourcesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsResource {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetResources ($sql:[CoreSQLInput]) {
            coreObjects: adminResources (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query AdminGetResource ($sql:[CoreSQLInput]) {
            coreObject: adminResource (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateResource ($payload:AdminResourceInput!) {
            adminCreateResource (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateResource ($payload:AdminResourceInput!) {
            adminUpdateResource (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteResource ($id:String!) {
            adminDeleteResource (id:$id) {
                ${fields}
            }
        }`
};

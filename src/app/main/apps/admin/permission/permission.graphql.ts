import gql from 'graphql-tag';
import { graphQL as adminPackageGraphQL } from '../package/package.graphql';
import { graphQL as adminActionGraphQL } from '../action/action.graphql';


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
    adminActions {
        ${adminActionGraphQL.fields}
    }
    adminPermissions (sql:$sqlPermissions) {
        profile_id
        resource_id
        action_id
    }
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Resource',
    table: 'admin_resource',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetPermissionsPagination ($sql:[CoreSQLInput] $sqlPermissions:[CoreSQLInput]) {
            coreObjectsPagination: adminResourcesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
            ${relationsFields}
        }`,









    queryRelationsObject: gql`
        query AdminGetRelationsPermission {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetPermissions ($sql:[CoreSQLInput]) {
            coreObjects: adminPermissions (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query AdminGetPermission ($sql:[CoreSQLInput]) {
            coreObject: adminPermission (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreatePermission ($payload:AdminPermissionInput!) {
            adminCreatePermission (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdatePermission ($payload:AdminPermissionInput!) {
            adminUpdatePermission (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeletePermission ($id:String!) {
            adminDeletePermission (id:$id) {
                ${fields}
            }
        }`
};

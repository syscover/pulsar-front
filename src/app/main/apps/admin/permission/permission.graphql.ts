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

    mutationUpdateObject: gql`        
        mutation AdminUpdatePermission ($profile_id:Int! $resource_id:String! $action_id:String! $checked:Boolean!) {
            adminUpdatePermission (profile_id:$profile_id resource_id:$resource_id action_id:$action_id checked:$checked)
        }`,
};

import gql from 'graphql-tag';
import { graphQL as adminResourceGraphQL } from './../resource/resource.graphql';

const fields = `
    id
    name
    resource_id
    resource {
        ${adminResourceGraphQL.fields}
    }
`;

const relationsFields = `
    configFieldGroupResources:coreConfig (config:$configFieldGroupResources)
    adminResources {
        ${adminResourceGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\FieldGroup',
    table: 'admin_field_group',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetFieldGroupsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminFieldGroupsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsFieldGroup ($configFieldGroupResources:CoreConfigInput!) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetFieldGroups ($sql:[CoreSQLInput]) {
            coreObjects: adminFieldGroups (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query AdminGetFieldGroup ($sql:[CoreSQLInput] $configFieldGroupResources:CoreConfigInput) {
            coreObject: adminFieldGroup (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateFieldGroup ($payload:AdminFieldGroupInput!) {
            adminCreateFieldGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateFieldGroup ($payload:AdminFieldGroupInput!) {
            adminUpdateFieldGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteFieldGroup ($id:Int!) {
            adminDeleteFieldGroup (id:$id) {
                ${fields}
            }
        }`
};

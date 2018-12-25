import gql from 'graphql-tag';
import { graphQL as adminResourceGraphQL } from './../resource/resource.graphql';

const fields = `  
    id 
    name
    resource_id
    width
    height
    sizes
    quality
    format
    resource {
        ${adminResourceGraphQL.fields}
    }
`;

const relationsFields = `
    adminResources {
        ${adminResourceGraphQL.fields}
    }
    configSizes:coreConfig (config:$configSizes)
    configAttachmentResources:coreConfig (config:$configAttachmentResources)
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\AttachmentFamily',
    table: 'admin_attachment_family',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetAttachmentFamiliesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminAttachmentFamiliesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsAttachmentFamily ($configSizes:CoreConfigInput! $configAttachmentResources:CoreConfigInput!) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetAttachmentFamilies ($sql:[CoreSQLInput] $configSizes:CoreConfigInput! $configAttachmentResources:CoreConfigInput!) {
            coreObjects: adminAttachmentFamilies (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query AdminGetAttachmentFamily ($sql:[CoreSQLInput] $configSizes:CoreConfigInput $configAttachmentResources:CoreConfigInput!) {
            coreObject: adminAttachmentFamily (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateAttachmentFamily ($payload:AdminAttachmentFamilyInput!) {
            adminCreateAttachmentFamily (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateAttachmentFamily ($payload:AdminAttachmentFamilyInput!) {
            adminUpdateAttachmentFamily (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteAttachmentFamily ($id:Int!) {
            adminDeleteAttachmentFamily (id:$id) {
                ${fields}
            }
        }`
};

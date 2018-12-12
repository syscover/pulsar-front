import gql from 'graphql-tag';
import { graphQL as adminResourceGraphQL } from '../resource/resource.graphql';

const fields = `  
    id
    resource_id
    resource {
        ${adminResourceGraphQL.fields}
    }
    mime
`;

const relationsFields = `
    adminResources {
        ${adminResourceGraphQL.fields}
    }
    configAttachmentResources:coreConfig (config:$configAttachmentResources)
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\AttachmentMime',
    table: 'admin_attachment_mime',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetAttachmentMimesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminAttachmentMimesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsAttachmentMime ($configAttachmentResources:CoreConfigInput!) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetAttachmentMimes ($sql:[CoreSQLInput] $configAttachmentResources:CoreConfigInput!) {
            coreObjects: adminAttachmentMimes (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query AdminGetAttachmentMime ($sql:[CoreSQLInput] $configAttachmentResources:CoreConfigInput!) {
            coreObject: adminAttachmentMime (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateAttachmentMime ($payload:AdminAttachmentMimeInput!) {
            adminCreateAttachmentMime (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateAttachmentMime ($payload:AdminAttachmentMimeInput!) {
            adminUpdateAttachmentMime (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteAttachmentMime ($id:Int!) {
            adminDeleteAttachmentMime (id:$id) {
                ${fields}
            }
        }`
};

import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class AttachmentMimeGraphQLService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query AdminGetAttachmentMimesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminAttachmentMimesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsAttachmentMime ($configAttachmentResources:CoreConfigInput! $configAttachmentResources:CoreConfigInput!){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetAttachmentMimes ($sql:[CoreSQLInput] $configAttachmentResources:CoreConfigInput!) {
            coreObjects: adminAttachmentMimes (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetAttachmentMime ($sql:[CoreSQLInput] $configAttachmentResources:CoreConfigInput!) {
            coreObject: adminAttachmentMime (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateAttachmentMime ($payload:AdminAttachmentMimeInput!) {
            adminCreateAttachmentMime (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateAttachmentMime ($payload:AdminAttachmentMimeInput!) {
            adminUpdateAttachmentMime (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteAttachmentMime ($id:Int!) {
            adminDeleteAttachmentMime (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\AttachmentMime';
        this.table = 'admin_attachment_mime';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminAttachmentMime {
                    id
                    resource_id
                    resource {
                        id
                        name
                    }
                    mime
                }
        `;

        this.relationsFields = `
                adminResources {
                    id
                    name
                }
                configAttachmentResources:coreConfig (config:$configAttachmentResources)
            `;

        super.init();
    }
}

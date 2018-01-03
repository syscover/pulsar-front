import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

@Injectable()
export class AttachmentMimeGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query AdminGetAttachmentMimesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminAttachmentMimesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsAttachmentMime ($configAttachmentResources:CoreConfigInput!){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetAttachmentMimes ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminAttachmentMimes (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetAttachmentMime ($sql:[CoreSQLQueryInput] $configAttachmentResources:CoreConfigInput) {
            coreObject: adminAttachmentMime (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation AdminAddAttachmentMime ($object:AdminAttachmentMimeInput!) {
            adminAddAttachmentMime (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateAttachmentMime ($object:AdminAttachmentMimeInput!) {
            adminUpdateAttachmentMime (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteAttachmentMime ($id:Int!) {
            adminDeleteAttachmentMime (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
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
            configAttachmentResources:coreConfig (config:$configAttachmentResources) {
                ... on CoreConfigOption {
                    id
                    name
                }
            }
            adminResources {
                id
                name
            }
        `;

        super.init();
    }
}

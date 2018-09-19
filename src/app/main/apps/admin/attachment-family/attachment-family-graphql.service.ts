import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class AttachmentFamilyGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetAttachmentFamiliesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminAttachmentFamiliesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsAttachmentFamily ($configSizes:CoreConfigInput! $configAttachmentResources:CoreConfigInput!){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetAttachmentFamilies ($sql:[CoreSQLInput]) {
            coreObjects: adminAttachmentFamilies (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetAttachmentFamily ($sql:[CoreSQLInput] $configSizes:CoreConfigInput $configAttachmentResources:CoreConfigInput!) {
            coreObject: adminAttachmentFamily (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation AdminAddAttachmentFamily ($object:AdminAttachmentFamilyInput!) {
            adminAddAttachmentFamily (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateAttachmentFamily ($object:AdminAttachmentFamilyInput!) {
            adminUpdateAttachmentFamily (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteAttachmentFamily ($id:Int!) {
            adminDeleteAttachmentFamily (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\AttachmentFamily';
        this.table = 'admin_attachment_family';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminAttachmentFamily {
                    id 
                    name
                    resource_id
                    width
                    height
                    sizes
                    quality
                    format
                    resource {
                        id
                        name
                    }
                }
            `;

        this.relationsFields = `
                adminResources {
                    id
                    name
                }
                configSizes:coreConfig (config:$configSizes) {
                    ... on CoreConfigOption {
                        id
                        name
                    }
                }
                configAttachmentResources:coreConfig (config:$configAttachmentResources) {
                ... on CoreConfigOption {
                    id
                    name
                }
            }
            `;

        super.init();
    }
}

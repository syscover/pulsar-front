import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class AttachmentFamilyGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'attachmentFamily'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectContainer = 'adminAttachmentFamily'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminAttachmentFamiliesPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields = `
        adminResources {
            id
            name
        }
        adminSizes: coreConfig (config:$config) {
            ... on CoreConfigOptionType {
                id
                name
            }
        }
    `;
    readonly fields = `
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

    readonly queryRelationsObject = gql`
        query AdminGetRelationsAttachmentFamily ($config:CoreConfigInput!){
            ${this.relationsFields}
        }`;

    readonly queryPaginationObject = gql`
        query AdminGetAttachmentFamiliesPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                objects (sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects = gql`
        query AdminGetAttachmentFamilies ($sql:[CoreSQLQueryInput]) {
            adminAttachmentFamilies (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly queryObject = gql`
        query AdminGetAttachmentFamily ($sql:[CoreSQLQueryInput] $config:CoreConfigInput!) {
            adminAttachmentFamily (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddAttachmentFamily ($attachmentFamily:AdminAttachmentFamilyInput!) {
            adminAddAttachmentFamily (attachmentFamily:$attachmentFamily){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateAttachmentFamily ($attachmentFamily:AdminAttachmentFamilyInput!) {
            adminUpdateAttachmentFamily (attachmentFamily:$attachmentFamily){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteAttachmentFamily ($id:String!) {
            adminDeleteAttachmentFamily (id:$id){
                ${this.fields}
            }
        }`;
}

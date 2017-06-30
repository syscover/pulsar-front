import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class AttachmentFamilyGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'attachmentFamily'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectsContainer = 'attachmentFamilies'; // to know which is the wrapper that contain objects list in response
    readonly objectContainer = 'adminAttachmentFamily'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminAttachmentFamiliesPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields = `
        adminResources {
            id
            name
        }
    `;
    readonly fields = `
        id 
        name
        resource_id
        resource {
            id
            name
        }
    `;

    readonly queryRelationsObject = gql`
        query AdminGetRelationsAttachmentFamily {
            ${this.relationsFields}
        }`;

    readonly queryPaginationObject = gql`
        query AdminGetAttachmentFamiliesPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                ${this.objectsContainer}(sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects;

    readonly queryObject = gql`
        query AdminGetAttachmentFamily ($sql:[CoreSQLQueryInput]) {
            adminAttachmentFamily (sql:$sql){
                ${this.fields}
            }
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

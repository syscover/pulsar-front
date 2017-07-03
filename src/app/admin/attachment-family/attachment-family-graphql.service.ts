import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class AttachmentFamilyGraphQLService extends GraphQLModel {

    objectModel = 'Syscover\\Admin\\Models\\AttachmentFamily'; // model of backoffice relative at this GraphQL service

    readonly mutationAddObject = gql`
        mutation AdminAddAttachmentFamily ($object:AdminAttachmentFamilyInput!) {
            adminAddAttachmentFamily (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateAttachmentFamily ($object:AdminAttachmentFamilyInput!) {
            adminUpdateAttachmentFamily (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteAttachmentFamily ($id:String!) {
            adminDeleteAttachmentFamily (id:$id){
                ${this.fields}
            }
        }`;

    init() {
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
                 adminResources: coreObjects (model:"Syscover\\\\Admin\\\\Models\\\\Resource"){
                    ... on AdminResource {
                        id
                        name
                    }
                }
                adminSizes: coreConfig (config:$config) {
                    ... on CoreConfigOptionType {
                        id
                        name
                    }
                }
            `;

        super.init();
    }
}

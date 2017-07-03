import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class CustomerClassTaxGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Market\\Models\\CustomerClassTax'; // model of backoffice relative at this GraphQL service
    readonly relationsFields = `
        coreConfig (key:$key) {
            ... on CoreConfigOptionType {
                id
                name
            }
        }
        adminFieldGroups {
            id
            name
        }
    `; // fields of relations object`
    readonly fields = `
        id 
        name 
        editor_id
        field_group_id 
        date 
        title
        slug
        link
        categories
        sort
        tags
        article_parent
        attachments
        data
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly mutationAddObject = gql`
        mutation CmsAddSection ($object:CmsSectionInput!) {
            cmsAddSection (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation CmsUpdateSection ($object:CmsSectionInput!) {
            cmsUpdateSection (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation CmsDeleteSection ($id:String!) {
            cmsDeleteSection (id:$id){
                ${this.fields}
            }
        }`;
}

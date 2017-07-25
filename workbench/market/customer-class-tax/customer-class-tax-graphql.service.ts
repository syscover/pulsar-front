import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class CustomerClassTaxGraphQLService extends GraphQLModel {

    objectModel = 'Syscover\\Market\\Models\\CustomerClassTax'; // model of backoffice relative at this GraphQL service
    relationsFields = `
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
    fields = `
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

    mutationAddObject = gql`
        mutation CmsAddSection ($object:CmsSectionInput!) {
            cmsAddSection (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CmsUpdateSection ($object:CmsSectionInput!) {
            cmsUpdateSection (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CmsDeleteSection ($id:String!) {
            cmsDeleteSection (id:$id){
                ${this.fields}
            }
        }`;
}

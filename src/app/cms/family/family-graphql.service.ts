import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class FamilyGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Cms\\Models\\Family'; // model of backoffice relative at this GraphQL service
    readonly relationsFields = `
        coreConfig (config:$config) {
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
    ... on CmsFamily {
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
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly mutationAddObject = gql`
        mutation CmsAddFamily ($object:CmsFamilyInput!) {
            cmsAddFamily (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation CmsUpdateFamily ($object:CmsFamilyInput!) {
            cmsUpdateFamily (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation CmsDeleteFamily ($id:String!) {
            cmsDeleteFamily (id:$id){
                ${this.fields}
            }
        }`;
}

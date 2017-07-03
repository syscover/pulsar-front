import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class CategoryGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Cms\\Models\\Category'; // model of backoffice relative at this GraphQL service
    readonly fields = `
    ... on CmsCategory {
            id
            lang_id
            name
            slug
            sort
            data_lang
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly mutationAddObject = gql`
        mutation CmsAddCategory ($object:CmsCategoryInput!) {
            cmsAddCategory (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation CmsUpdateCategory ($object:CmsCategoryInput!) {
            cmsUpdateCategory (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation CmsDeleteCategory ($id:String! $lang:String!) {
            cmsDeleteCategory (id:$id lang:$lang){
                ${this.fields}
            }
        }`;
}

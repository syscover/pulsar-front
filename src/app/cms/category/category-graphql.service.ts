import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class CategoryGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query CmsGetCategoriesPagination ($sql:[CoreSQLQueryInput] $lang:String) {
            coreObjectsPagination: cmsCategoriesPagination (sql:$sql lang:$lang) {
                total
                filtered
                objects (sql:$sql) {
                    ${this.fields}
                }
            }
        }`;

    queryObjects = gql`
        query CmsGetCategories ($sql:[CoreSQLQueryInput]) {
            coreObjects: cmsCategories (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CmsGetCategory ($sql:[CoreSQLQueryInput]) {
            coreObject: cmsCategory (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation CmsAddCategory ($object:CmsCategoryInput!) {
            cmsAddCategory (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CmsUpdateCategory ($object:CmsCategoryInput!) {
            cmsUpdateCategory (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CmsDeleteCategory ($id:String! $lang:String!) {
            cmsDeleteCategory (id:$id lang:$lang){
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Cms\\Models\\Category';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CmsCategory {
                id
                lang_id
                name
                slug
                sort
                data_lang
            }
        `;

        super.init();
    }
}

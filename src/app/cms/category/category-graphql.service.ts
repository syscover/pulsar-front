import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class CategoryGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'category'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectsContainer = 'categories'; // to know which is the wrapper that contain objects list in response
    readonly objectContainer = 'cmsCategory'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'cmsCategoriesPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields;
    readonly fields = `
        id 
        lang_id
        name
        slug
        sort
        data_lang
    `; // defaults fields that will be return

    readonly queryRelationsObject;

    readonly queryPaginationObject = gql`
        query CmsGetCategoriesPagination ($sql:[CoreSQLQueryInput] $lang:String) {
            ${this.paginationContainer} (sql:$sql lang:$lang) {
                total
                filtered
                ${this.objectsContainer}(sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects = gql`
        query CmsGetCategories ($sql:[CoreSQLQueryInput]) {
            cmsCategories (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly queryObject = gql`
        query CmsGetCategory ($sql:[CoreSQLQueryInput]) {
            cmsCategory (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly mutationAddObject = gql`
        mutation CmsAddCategory ($category:CmsCategoryInput!) {
            cmsAddCategory (category:$category){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation CmsUpdateCategory ($category:CmsCategoryInput!) {
            cmsUpdateCategory (category:$category){
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

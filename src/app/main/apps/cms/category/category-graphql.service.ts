import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class CategoryGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query CmsGetCategoriesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: cmsCategoriesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query CmsGetRelationsCategory {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CmsGetCategories ($sql:[CoreSQLInput]) {
            coreObjects: cmsCategories (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CmsGetCategory ($sql:[CoreSQLInput]) {
            coreObject: cmsCategory (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation CmsCreateCategory ($payload:CmsCategoryInput!) {
            cmsCreateCategory (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CmsUpdateCategory ($payload:CmsCategoryInput!) {
            cmsUpdateCategory (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CmsDeleteCategory ($lang_id:String! $id:Int!) {
            cmsDeleteCategory (lang_id:$lang_id id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Cms\\Models\\Category';
        this.table = 'cms_category';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CmsCategory {
                ix
                id
                lang_id
                name
                slug
                section_id
                sort
                data_lang
            }
        `;

        this.relationsFields = `
            cmsSections {
                id
                name
            }
        `;

        super.init();
    }
}

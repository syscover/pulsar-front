import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class CategoryGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query CmsGetCategoriesPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
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
            ${this.relationsFields}
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

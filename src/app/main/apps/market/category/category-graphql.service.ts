import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class CategoryGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query MarketGetCategoriesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: marketCategoriesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject  = gql`
        query MarketGetRelationsCategory ($sqlCategory:[CoreSQLInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetCategories ($sql:[CoreSQLInput]) {
            coreObjects: marketCategories (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetCategory ($sql:[CoreSQLInput] $sqlCategory:[CoreSQLInput]) {
            coreObject: marketCategory (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation MarketCreateCategory ($object:MarketCategoryInput!) {
            marketCreateCategory (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateCategory ($object:MarketCategoryInput!) {
            marketUpdateCategory (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteCategory ($id:Int! $lang_id:String!) {
            marketDeleteCategory (id:$id lang_id:$lang_id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Market\\Models\\Category';
        this.table = 'market_category';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketCategory {
                ix
                id
                lang_id
                parent_id
                name
                slug
                active
                description
                data_lang
            }
        `;

        this.relationsFields = `
            marketCategories (sql:$sqlCategory) {
                ix
                id
                lang_id
                name
            }
        `;

        super.init();
    }
}

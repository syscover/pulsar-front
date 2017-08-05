import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class CategoryGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query MarketGetCategoriesPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketCategoriesPagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query MarketGetCategories ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketCategories (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetCategory ($sql:[CoreSQLQueryInput]) {
            coreObject: marketCategory (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation MarketAddCategory ($object:MarketCategoryInput!) {
            marketAddCategory (object:$object){
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
        mutation MarketDeleteCategory ($id:String! $lang:String!) {
            marketDeleteCategory (id:$id lang:$lang){
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Market\\Models\\Category';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketCategory {
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

        super.init();
    }
}

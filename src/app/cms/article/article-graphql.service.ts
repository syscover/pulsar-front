import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class ArticleGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query CmsGetArticlesPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: cmsArticlesPagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql) {
                    ${this.fields}
                }
            }
        }`;

    queryRelationsObject  = gql`
        query CmsGetRelationsArticle ($sqlAttachmentFamily:[CoreSQLQueryInput] $sqlArticle:[CoreSQLQueryInput] $config:CoreConfigInput!){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CmsGetArticles ($sql:[CoreSQLQueryInput]) {
            coreObjects: cmsArticles (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query GetObject ($sql:[CoreSQLQueryInput] $sqlAttachmentFamily:[CoreSQLQueryInput] $sqlArticle:[CoreSQLQueryInput] $config:CoreConfigInput!) {
            coreObject: cmsArticle (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation CmsAddArticle ($object:CmsArticleInput!) {
            cmsAddArticle (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CmsUpdateArticle ($object:CmsArticleInput!) {
            cmsUpdateArticle (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CmsDeleteArticle ($id:String! $lang:String!) {
            cmsDeleteArticle (id:$id lang:$lang){
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Cms\\Models\\Article';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CmsArticle {
                id
                lang_id
                parent_article_id
                name
                author_id
                section_id
                family_id
                status_id
                publish
                date
                title
                slug
                link
                blank
                sort
                article
                data_lang
                data
                attachments {
                    id
                }
            }
        `;

        this.relationsFields = `
            cmsSections {
                id
                name
                family {
                    id 
                    name
                }
            }
            cmsFamilies {
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
            }
            cmsCategories {
                id
                name
            }
            cmsStatuses: coreConfig (config:$config) {
                ... on CoreConfigOptionType {
                    id
                    name
                }
            }
            adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
                id
                name
            }
            cmsArticles (sql:$sqlArticle) {
                id
                name
            }
        `;

        super.init();
    }
}

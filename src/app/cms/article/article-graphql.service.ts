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
                section {
                    id
                    name
                }
                family_id
                status_id
                publish
                date
                title
                slug
                categories {
                    id
                    name
                }
                link
                blank
                sort
                tags {
                    id
                    name
                }
                article
                data_lang
                data
                attachments {
                    id
                    lang_id
                    object_id
                    object_type
                    family_id
                    sort
                    name
                    base_path
                    file_name
                    url
                    mime
                    extension
                    size
                    width
                    height
                    library_id
                    library_file_name
                    attachment_library {
                        id
                        name
                        base_path
                        file_name
                        url
                        mime
                        extension
                        size
                        width
                        height
                    }
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
                resource_id
                width
                height
                sizes
                quality
                format
            }
            cmsArticles (sql:$sqlArticle) {
                id
                name
            }
        `;

        super.init();
    }
}

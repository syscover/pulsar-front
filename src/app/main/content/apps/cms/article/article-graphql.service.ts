import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ArticleGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query CmsGetArticlesPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput] $config:CoreConfigInput!) {
            coreObjectsPagination: cmsArticlesPagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
            cmsStatuses: coreConfig (config:$config) {
                ... on CoreConfigOption {
                    id
                    name
                }
            }
        }`;

    queryRelationsObject  = gql`
        query CmsGetRelationsArticle (
            $sqlSection: [CoreSQLQueryInput]
            $sqlFamily: [CoreSQLQueryInput]
            $sqlAttachmentFamily:[CoreSQLQueryInput]
            $sqlCategory:[CoreSQLQueryInput]
            $sqlArticle:[CoreSQLQueryInput]
            $configStatuses:CoreConfigInput!
        ) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CmsGetArticles ($sql:[CoreSQLQueryInput]) {
            coreObjects: cmsArticles (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CmsGetArticle (
            $sql:[CoreSQLQueryInput]
            $sqlSection: [CoreSQLQueryInput]
            $sqlFamily: [CoreSQLQueryInput]
            $sqlAttachmentFamily:[CoreSQLQueryInput]
            $sqlCategory:[CoreSQLQueryInput]
            $sqlArticle:[CoreSQLQueryInput]
            $configStatuses:CoreConfigInput!
        ) {
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
        mutation CmsDeleteArticle ($lang_id:String! $id:Int!) {
            cmsDeleteArticle (lang_id:$lang_id id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Cms\\Models\\Article';
        this.table = 'cms_article';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CmsArticle {
                ix
                id
                lang_id
                parent_id
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
                excerpt
                article
                data_lang
                data
                attachments {
                    id
                    lang_id
                    id
                    object_type
                    family_id
                    sort
                    alt
                    title
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
            cmsSections (sql:$sqlSection) {
                ix
                id
                name
                family {
                    id
                    name
                }
                attachment_families
            }
            cmsFamilies (sql:$sqlFamily) {
                id
                name
                excerpt_editor_id
                article_editor_id
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
            cmsCategories (sql:$sqlCategory) {
                ix
                id
                lang_id
                name
            }
            cmsStatuses: coreConfig (config:$configStatuses) {
                ... on CoreConfigOption {
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
                ix
                id
                name
            }
        `;

        super.init();
    }
}

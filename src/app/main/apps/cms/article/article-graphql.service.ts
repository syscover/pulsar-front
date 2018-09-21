import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ArticleGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query CmsGetArticlesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput] $config:CoreConfigInput!) {
            coreObjectsPagination: cmsArticlesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            cmsStatuses: coreConfig (config:$config)
        }`;

    queryRelationsObject  = gql`
        query CmsGetRelationsArticle (
            $sqlSection: [CoreSQLInput]
            $sqlFamily: [CoreSQLInput]
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlArticle:[CoreSQLInput]
            $configStatuses:CoreConfigInput!
        ) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CmsGetArticles ($sql:[CoreSQLInput]) {
            coreObjects: cmsArticles (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CmsGetArticle (
            $sql:[CoreSQLInput]
            $sqlSection: [CoreSQLInput]
            $sqlFamily: [CoreSQLInput]
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlArticle:[CoreSQLInput]
            $configStatuses:CoreConfigInput!
        ) {
            coreObject: cmsArticle (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation CmsCreateArticle ($object:CmsArticleInput!) {
            cmsCreateArticle (object:$object){
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

    init(): void
    {
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
                categories_id
                categories {
                    id
                    name
                }
                link
                blank
                sort
                tags 
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
            cmsStatuses: coreConfig (config:$configStatuses)
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

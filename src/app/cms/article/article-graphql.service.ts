import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class ArticleGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Cms\\Models\\Article'; // model of backoffice relative at this GraphQL service
    readonly relationsFields = `
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
    readonly fields = `
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
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly mutationAddObject = gql`
        mutation CmsAddArticle ($object:CmsArticleInput!) {
            cmsAddArticle (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation CmsUpdateArticle ($object:CmsArticleInput!) {
            cmsUpdateArticle (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation CmsDeleteArticle ($id:String! $lang:String!) {
            cmsDeleteArticle (id:$id lang:$lang){
                ${this.fields}
            }
        }`;
}

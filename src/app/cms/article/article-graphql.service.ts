import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class ArticleGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'article'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectsContainer = 'articles'; // to know which is the wrapper that contain objects list in response
    readonly objectContainer = 'cmsArticle'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'cmsArticlesPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields = `
        cmsFamilies {
            id
            name
        }
        cmsCategories {
            id
            name
        }
    `;
    readonly fields = `
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
    `; // defaults fields that will be return

    readonly queryRelationsObject  = gql`
        query CmsGetRelationsArticles {
            ${this.relationsFields}
        }`;

    readonly queryPaginationObject = gql`
        query CmsGetArticlesPagination ($sql:[CoreSQLQueryInput] $lang:String) {
            ${this.paginationContainer} (sql:$sql lang:$lang) {
                total
                filtered
                ${this.objectsContainer}(sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects = gql`
        query CmsGetArticles ($sql:[CoreSQLQueryInput]) {
            cmsArticles (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    readonly queryObject = gql`
        query CmsGetArticle ($sql:[CoreSQLQueryInput]) {
            cmsArticle (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    readonly mutationAddObject = gql`
        mutation CmsAddArticle ($article:CmsArticleInput!) {
            cmsAddArticle (article:$article){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation CmsUpdateArticle ($article:CmsArticleInput!) {
            cmsUpdateArticle (article:$article){
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

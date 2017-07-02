import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class CustomerClassTaxGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'section'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectContainer = 'cmsSection'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'cmsSectionsPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields = `
        coreConfig (key:$key) {
            ... on CoreConfigOptionType {
                id
                name
            }
        }
        adminFieldGroups {
            id
            name
        }
    `; // fields of relations object`
    readonly fields = `
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
        data
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly queryRelationsObject = gql`
        query CmsGetRelationsSection($key:String!) {
            ${this.relationsFields}
        }`;

    readonly queryPaginationObject = gql`
        query CmsGetSectionsPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                objects (sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects;

    readonly queryObject = gql`
        query GetCmsSection ($sql:[CoreSQLQueryInput] $key:String!) {
            cmsSection (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    readonly mutationAddObject = gql`
        mutation CmsAddSection ($section:CmsSectionInput!) {
            cmsAddSection (section:$section){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation CmsUpdateSection ($section:CmsSectionInput!) {
            cmsUpdateSection (section:$section){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation CmsDeleteSection ($id:String!) {
            cmsDeleteSection (id:$id){
                ${this.fields}
            }
        }`;
}

import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class SectionGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'section'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectsContainer = 'sections'; // to know which is the wrapper that contain objects list in response
    readonly objectContainer = 'cmsSection'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'cmsSectionsPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields = `
        cmsFamilies {
            id
            name
        }
    `; // fields of relations object`
    readonly fields = `
        id 
        name 
        article_family_id
        family {
            id
            name
        }
    `; // defaults fields that will be return

    readonly queryRelationsObject = gql`
        query CmsGetRelationsSection {
            ${this.relationsFields}
        }`;

    readonly queryPaginationObject = gql`
        query CmsGetSectionsPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                ${this.objectsContainer}(sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects = gql`
        query AdminGetPackages ($sql:[CoreSQLQueryInput]) {
            adminPackages (sql:$sql){
                ${this.fields}
            }
        }`;

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

import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class FamilyGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query CmsGetFamiliesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: cmsFamiliesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query CmsGetRelationsFamily ($configEditors:CoreConfigInput! $sqlFieldGroup:[CoreSQLInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CmsGetFamilies ($sql:[CoreSQLInput] $configEditors:CoreConfigInput $sqlFieldGroup:[CoreSQLInput]) {
            coreObjects: cmsFamilies (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query CmsGetFamily ($sql:[CoreSQLInput] $configEditors:CoreConfigInput $sqlFieldGroup:[CoreSQLInput]) {
            coreObject: cmsFamily (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation CmsCreateFamily ($payload:CmsFamilyInput!) {
            cmsCreateFamily (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CmsUpdateFamily ($payload:CmsFamilyInput!) {
            cmsUpdateFamily (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CmsDeleteFamily ($id:Int!) {
            cmsDeleteFamily (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Cms\\Models\\Family';
        this.table = 'cms_family';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CmsFamily {
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
                data
            }
        `;

        this.relationsFields = `
            coreConfig (config:$configEditors)
            adminFieldGroups (sql:$sqlFieldGroup) {
                id
                name
            }
        `;

        super.init();
    }
}

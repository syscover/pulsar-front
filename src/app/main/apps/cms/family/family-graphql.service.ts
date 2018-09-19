import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class FamilyGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query CmsGetFamiliesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: cmsFamiliesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query CmsGetRelationsFamily ($configEditors:CoreConfigInput! $sqlFieldGroup:[CoreSQLQueryInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CmsGetFamilies ($sql:[CoreSQLQueryInput] $configEditors:CoreConfigInput $sqlFieldGroup:[CoreSQLQueryInput]) {
            coreObjects: cmsFamilies (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query CmsGetFamily ($sql:[CoreSQLQueryInput] $configEditors:CoreConfigInput $sqlFieldGroup:[CoreSQLQueryInput]) {
            coreObject: cmsFamily (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation CmsAddFamily ($object:CmsFamilyInput!) {
            cmsAddFamily (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CmsUpdateFamily ($object:CmsFamilyInput!) {
            cmsUpdateFamily (object:$object){
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
            coreConfig (config:$configEditors) {
                ... on CoreConfigOption {
                    id
                    name
                }
            }
            adminFieldGroups (sql:$sqlFieldGroup) {
                id
                name
            }
        `;

        super.init();
    }
}

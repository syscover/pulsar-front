import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class FamilyGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query CmsGetFamiliesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: cmsFamiliesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query CmsGetRelationsFamily ($configEditors:CoreConfigInput! $sqlFieldGroup:[CoreSQLQueryInput] $sqlAttachmentFamily:[CoreSQLQueryInput]){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CmsGetFamilies ($sql:[CoreSQLQueryInput] $configEditors:CoreConfigInput $sqlFieldGroup:[CoreSQLQueryInput] $sqlAttachmentFamily:[CoreSQLQueryInput]) {
            coreObjects: cmsFamilies (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query CmsGetFamily ($sql:[CoreSQLQueryInput] $configEditors:CoreConfigInput $sqlFieldGroup:[CoreSQLQueryInput] $sqlAttachmentFamily:[CoreSQLQueryInput]) {
            coreObject: cmsFamily (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
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

    init() {
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
                attachment_families
                data
            }
        `;

        this.relationsFields = `
            coreConfig (config:$configEditors) {
                ... on CoreConfigOptionType {
                    id
                    name
                }
            }
            adminFieldGroups (sql:$sqlFieldGroup) {
                id
                name
            }
            adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
                id
                name
            }
        `;

        super.init();
    }
}

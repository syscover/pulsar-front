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
        query CmsGetRelationsFamily ($configEditors:CoreConfigInput! $sqlFieldGroup:[CoreSQLQueryInput]){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CmsGetFamilies ($sql:[CoreSQLQueryInput] $config:CoreConfigInput) {
            coreObjects: cmsFamilies (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query CmsGetFamily ($sql:[CoreSQLQueryInput] $config:CoreConfigInput) {
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
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Cms\\Models\\Family';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CmsFamily {
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
        `;

        super.init();
    }
}

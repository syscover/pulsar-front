import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class FieldGroupGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query AdminGetFieldGroupsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminFieldGroupsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql) {
                    ${this.fields}
                }
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsFieldGroup ($config:CoreConfigInput!){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetFieldGroups ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminFieldGroups (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetFieldGroup ($sql:[CoreSQLQueryInput] $config:CoreConfigInput) {
            coreObject: adminFieldGroup (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation AdminAddFieldGroup ($object:AdminFieldGroupInput!) {
            adminAddFieldGroup (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateFieldGroup ($object:AdminFieldGroupInput!) {
            adminUpdateFieldGroup (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteFieldGroup ($id:String!) {
            adminDeleteFieldGroup (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Admin\\Models\\FieldGroup';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminFieldGroup {
                id
                name
                resource_id
                resource {
                    id
                    name
                }
            }
        `;

        this.relationsFields = `
            coreConfig (config:$config) {
                ... on CoreConfigOptionType {
                    id
                    name
                }
            }
            adminResources {
                id
                name
            }
        `;

        super.init();
    }
}

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
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsFieldGroup ($configFieldGroupResources:CoreConfigInput!){
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
        query AdminGetFieldGroup ($sql:[CoreSQLQueryInput] $configFieldGroupResources:CoreConfigInput) {
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
        mutation AdminDeleteFieldGroup ($id:Int!) {
            adminDeleteFieldGroup (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Admin\\Models\\FieldGroup';
        this.table = 'field_group';

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
            configFieldGroupResources:coreConfig (config:$configFieldGroupResources) {
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

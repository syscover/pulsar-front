import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class FieldGroupGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'fieldGroup'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectContainer = 'adminFieldGroup'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminFieldGroupsPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields = `
        coreConfig (key:$key) {
            ... on CoreConfigOptionType {
                id
                name
            }
        }
        adminResources {
            id
            name
        }
    `; // fields of relations object`
    readonly fields = `
    ... on AdminFieldGroup {
            id
            name
            resource_id
            resource {
                id
                name
            }
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination`

    readonly queryRelationsObject = gql`
        query AdminGetRelationsFieldGroup($key:String!) {
            ${this.relationsFields}
        }`;

    readonly queryPaginationObject = gql`
        query AdminGetFieldGroupsPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                objects (sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects = gql`
        query AdminGetFieldGroups ($sql:[CoreSQLQueryInput] $key:String!) {
            adminFieldGroups (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    readonly queryObject = gql`
        query AdminGetFieldGroup ($sql:[CoreSQLQueryInput] $key:String!) {
            adminFieldGroup (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddFieldGroup ($fieldGroup:AdminFieldGroupInput!) {
            adminAddFieldGroup (fieldGroup:$fieldGroup){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateFieldGroup ($fieldGroup:AdminFieldGroupInput!) {
            adminUpdateFieldGroup (fieldGroup:$fieldGroup){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteFieldGroup ($id:String!) {
            adminDeleteFieldGroup (id:$id){
                ${this.fields}
            }
        }`;
}

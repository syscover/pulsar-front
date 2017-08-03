import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';


export class ActionGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query AdminGetActionsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminActionsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query AdminGetActions ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminActions (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetAction ($sql:[CoreSQLQueryInput]) {
            coreObject: adminAction (sql:$sql) {
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation AdminAddAction ($object:AdminActionInput!) {
            adminAddAction (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateAction ($object:AdminActionInput! $idOld:String!) {
            adminUpdateAction (object:$object idOld:$idOld) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteAction ($id:String!) {
            adminDeleteAction (id:$id) {
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Admin\\Models\\Action';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminAction {
                id 
                name
            }
        `;

        super.init();
    }
}

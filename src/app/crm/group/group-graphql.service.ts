import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class GroupGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query CrmGetGroupsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: crmGroupsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query CrmGetGroups ($sql:[CoreSQLQueryInput]) {
            coreObjects: crmGroups (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CrmGetGroup ($sql:[CoreSQLQueryInput]) {
            coreObject: crmGroup (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation CrmAddGroup ($object:CrmGroupInput!) {
            crmAddGroup (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CrmUpdateGroup ($object:CrmGroupInput!) {
            crmUpdateGroup (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CrmDeleteGroup ($id:Int!) {
            crmDeleteGroup (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Crm\\Models\\Group';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CrmGroup {
                    id
                    name
                }
        `;

        super.init();
    }
}

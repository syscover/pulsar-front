import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ActionGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetActionsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminActionsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query AdminGetActions ($sql:[CoreSQLInput]) {
            coreObjects: adminActions (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetAction ($sql:[CoreSQLInput]) {
            coreObject: adminAction (sql:$sql) {
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateAction ($object:AdminActionInput!) {
            adminCreateAction (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateAction ($object:AdminActionInput!) {
            adminUpdateAction (object:$object) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteAction ($id:String!) {
            adminDeleteAction (id:$id) {
                ${this.fields}
            }
        }`;

    init() 
    {
        this.model = 'Syscover\\Admin\\Models\\Action';
        this.table = 'admin_action';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminAction {
                ix
                id
                name
            }
        `;

        super.init();
    }
}

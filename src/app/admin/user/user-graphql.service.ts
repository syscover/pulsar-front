import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class UserGraphQLService extends GraphQLModel {

    // model of backoffice relative at this GraphQL service
    objectModel = 'Syscover\\Admin\\Models\\User';
    
    mutationAddObject = gql`
        mutation AdminAddUser ($object:AdminUserInput!) {
            adminAddUser (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateUser ($object:AdminUserInput!) {
            adminUpdateUser (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteUser ($id:String!) {
            adminDeleteUser (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminUser {
                id 
                name
            }
        `;

        this.relationsFields = `
            adminPackages {
                id
                name
            }
        `;

        super.init();
    }
}

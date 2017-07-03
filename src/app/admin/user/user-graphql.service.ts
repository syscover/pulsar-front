import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class UserGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Admin\\Models\\User'; // model of backoffice relative at this GraphQL service
    readonly fields = `
        id 
        name
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly mutationAddObject = gql`
        mutation AdminAddUser ($object:AdminUserInput!) {
            adminAddUser (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateUser ($object:AdminUserInput!) {
            adminUpdateUser (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteUser ($id:String!) {
            adminDeleteUser (id:$id){
                ${this.fields}
            }
        }`;
}

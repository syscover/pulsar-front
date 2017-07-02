import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class UserGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'user'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectContainer = 'adminUser'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminUsersPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields;
    readonly fields = 'id name'; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly queryRelationsObject;

    readonly queryPaginationObject = gql`
        query AdminGetUsersPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                objects (sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects;

    readonly queryObject = gql`
        query AdminGetUser ($sql:[CoreSQLQueryInput]) {
            adminUser (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddUser ($user:AdminUserInput!) {
            adminAddUser (user:$user){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateUser ($user:AdminUserInput!) {
            adminUpdateUser (user:$user){
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

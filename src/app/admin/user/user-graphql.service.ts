import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class UserGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query AdminGetUsersPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminUsersPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql) {
                    ${this.fields}
                }
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsUser {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetUsers ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminUsers (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetUser ($sql:[CoreSQLQueryInput]) {
            coreObject: adminUser (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

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
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Admin\\Models\\User';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminUser {
                id 
                name
                surname
                lang_id
                email
                profile_id
                access
                user
                profile {
                    id
                    name
                }
            }
        `;

        this.relationsFields = `
            adminProfiles {
                id
                name
            }
            adminLangs {
                id
                name
            }
        `;

        super.init();
    }
}

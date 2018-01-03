import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

@Injectable()
export class UserGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query AdminGetUsersPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminUsersPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
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
        mutation AdminDeleteUser ($id:Int!) {
            adminDeleteUser (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Admin\\Models\\User';
        this.table = 'admin_user';

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

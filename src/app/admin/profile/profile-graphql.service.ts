import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class ProfileGraphQLService extends GraphQLModel {

    // model of backoffice relative at this GraphQL service
    objectModel = 'Syscover\\Admin\\Models\\Profile';

    queryPaginationObject = gql`
        query AdminGetProfilesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminProfilesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql) {
                    ${this.fields}
                }
            }
        }`;

    queryObjects = gql`
        query AdminGetProfiles ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminProfiles (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetProfile ($sql:[CoreSQLQueryInput]) {
            coreObject: adminProfile (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation AdminAddProfile ($object:AdminProfileInput!) {
            adminAddProfile (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateProfile ($object:AdminProfileInput!) {
            adminUpdateProfile (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteProfile ($id:String!) {
            adminDeleteProfile (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminProfile {
                id 
                name
            }
        `;

        super.init();
    }
}

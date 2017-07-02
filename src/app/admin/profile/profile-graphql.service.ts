import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class ProfileGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'profile'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectContainer = 'adminProfile'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminProfilesPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields;
    readonly fields = `
    ... on AdminProfile {
            id 
            name
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly queryRelationsObject;

    readonly queryPaginationObject = gql`
        query AdminGetProfilesPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                objects (sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects = gql`
        query AdminGetProfiles ($sql:[CoreSQLQueryInput]) {
            adminProfiles (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly queryObject = gql`
        query AdminGetProfile ($sql:[CoreSQLQueryInput]) {
            adminProfile (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddProfile ($profile:AdminProfileInput!) {
            adminAddProfile (profile:$profile){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateProfile ($profile:AdminProfileInput!) {
            adminUpdateProfile (profile:$profile){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteProfile ($id:String!) {
            adminDeleteProfile (id:$id){
                ${this.fields}
            }
        }`;
}

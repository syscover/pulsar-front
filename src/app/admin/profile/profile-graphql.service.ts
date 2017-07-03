import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class ProfileGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Admin\\Models\\Profile'; // model of backoffice relative at this GraphQL service
    readonly fields = `
    ... on AdminProfile {
            id 
            name
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly mutationAddObject = gql`
        mutation AdminAddProfile ($object:AdminProfileInput!) {
            adminAddProfile (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateProfile ($object:AdminProfileInput!) {
            adminUpdateProfile (object:$object){
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

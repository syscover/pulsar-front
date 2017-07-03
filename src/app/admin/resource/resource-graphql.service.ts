import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class ResourceGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Admin\\Models\\Resource'; // model of backoffice relative at this GraphQL service
    readonly relationsFields = `
        adminPackages {
            id
            name
        }
    `;
    readonly fields = `
    ... on AdminResource {
            id 
            name 
            package_id
            package {
                id
                name
            }
        }
    `;

    readonly mutationAddObject = gql`
        mutation AdminAddResource ($object:AdminResourceInput!) {
            adminAddResource (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateResource ($object:AdminResourceInput! $idOld:String!) {
            adminUpdateResource (object:$object idOld:$idOld){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteResource ($id:String!) {
            adminDeleteResource (id:$id){
                ${this.fields}
            }
        }`;
}

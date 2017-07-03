import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class PackageGraphQLService extends GraphQLModel {

    objectModel = 'Syscover\\Admin\\Models\\Package'; // model of backoffice relative at this GraphQL service

    mutationAddObject = gql`
        mutation AdminAddPackage ($object:AdminPackageInput!) {
            adminAddPackage (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdatePackage ($object:AdminPackageInput!) {
            adminUpdatePackage (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeletePackage ($id:String!) {
            adminDeletePackage (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminPackage {
                    id
                    name
                    root
                    active
                    sort
                }
        `;

        super.init();
    }
}

import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class PackageGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query AdminGetPackagesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminPackagesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query AdminGetPackages ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminPackages (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetPackage ($sql:[CoreSQLQueryInput]) {
            coreObject: adminPackage (sql:$sql){
                ${this.fields}
            }
        }`;

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
        mutation AdminDeletePackage ($id:Int!) {
            adminDeletePackage (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Admin\\Models\\Package';

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

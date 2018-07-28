import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class PackageGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetPackagesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminPackagesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
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

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\Package';
        this.table = 'admin_package';

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

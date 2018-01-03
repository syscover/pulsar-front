import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

@Injectable()
export class ResourceGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query AdminGetResourcesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminResourcesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsResource {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetResources ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminResources (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetResource ($sql:[CoreSQLQueryInput]) {
            coreObject: adminResource (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation AdminAddResource ($object:AdminResourceInput!) {
            adminAddResource (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateResource ($object:AdminResourceInput!) {
            adminUpdateResource (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteResource ($id:String!) {
            adminDeleteResource (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Admin\\Models\\Resource';
        this.table = 'admin_resource';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminResource {
                ix
                id
                name 
                package_id
                package {
                    id
                    name
                }
            }
        `;

        this.relationsFields = `
            adminPackages {
                id
                name
            }
        `;

        super.init();
    }
}
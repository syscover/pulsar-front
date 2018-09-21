import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ResourceGraphQLService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query AdminGetResourcesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminResourcesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsResource {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetResources ($sql:[CoreSQLInput]) {
            coreObjects: adminResources (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetResource ($sql:[CoreSQLInput]) {
            coreObject: adminResource (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateResource ($object:AdminResourceInput!) {
            adminCreateResource (object:$object){
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

    init(): void
    {
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

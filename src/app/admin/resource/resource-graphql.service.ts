import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class ResourceGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'resource'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectContainer = 'adminResource'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminResourcesPagination'; // to know wich is the wrapper that contain pagination in response
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

    readonly queryRelationsObject = gql`
        query AdminGetRelationsResource {
            ${this.relationsFields}
        }`;

    readonly queryPaginationObject = gql`
        query AdminGetResourcesPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                objects (sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects = gql`
        query AdminGetResources ($sql:[CoreSQLQueryInput]) {
            adminResources (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    readonly queryObject = gql`
        query GetAdminResource ($sql:[CoreSQLQueryInput]) {
            adminResource (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddResource ($resource:AdminResourceInput!) {
            adminAddResource (resource:$resource){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateResource ($resource:AdminResourceInput! $idOld:String!) {
            adminUpdateResource (resource:$resource idOld:$idOld){
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

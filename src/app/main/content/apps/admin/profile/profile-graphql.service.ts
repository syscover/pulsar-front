import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ProfileGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetProfilesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminProfilesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
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
        mutation AdminDeleteProfile ($id:Int!) {
            adminDeleteProfile (id:$id){
                ${this.fields}
            }
        }`;

    init() 
    {
        this.model = 'Syscover\\Admin\\Models\\Profile';
        this.table = 'admin_profile';

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

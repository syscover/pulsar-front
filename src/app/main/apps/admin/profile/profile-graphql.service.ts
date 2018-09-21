import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ProfileGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetProfilesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminProfilesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query AdminGetProfiles ($sql:[CoreSQLInput]) {
            coreObjects: adminProfiles (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetProfile ($sql:[CoreSQLInput]) {
            coreObject: adminProfile (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateProfile ($object:AdminProfileInput!) {
            adminCreateProfile (object:$object){
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

    init(): void
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

import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class OAuthClientGraphqlService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query AdminGetOAuthClientsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminOAuthClientsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query AdminGetOAuthClients ($sql:[CoreSQLInput]) {
            coreObjects: adminOAuthClients (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetOAuthClient ($sql:[CoreSQLInput]) {
            coreObject: adminOAuthClient (sql:$sql) {
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateOAuthClient ($payload:AdminOAuthClientInput!) {
            adminCreateOAuthClient (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateOAuthClient ($payload:AdminOAuthClientInput!) {
            adminUpdateOAuthClient (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteOAuthClient ($id:String!) {
            adminDeleteOAuthClient (id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\OAuthClient';
        this.table = 'oauth_clients';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminOAuthClient {
                id
                user_id
                name
                secret
                redirect
                personal_access_client
                password_client
                revoked
            }
        `;

        super.init();
    }
}

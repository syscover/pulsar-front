import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class OauthAccessTokenGraphqlService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query AdminGetOAuthClientsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminOAuthAccessTokensPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query AdminGetOAuthAccessTokens ($sql:[CoreSQLInput]) {
            coreObjects: adminOAuthAccessTokens (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetOAuthAccessToken ($sql:[CoreSQLInput]) {
            coreObject: adminOAuthAccessToken (sql:$sql) {
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateOAuthAccessToken ($object:AdminOAuthAccessTokenInput!) {
            adminCreateOAuthAccessToken (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateOAuthAccessToken ($object:AdminOAuthAccessTokenInput!) {
            adminUpdateOAuthAccessToken (object:$object) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteOAuthAccessToken ($id:String!) {
            adminDeleteOAuthAccessToken (id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\OAuthAccessToken';
        this.table = 'oauth_clients';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminOAuthAccessToken {
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

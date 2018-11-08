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
        mutation AdminCreateOAuthAccessToken ($payload:AdminOAuthAccessTokenInput!) {
            adminCreateOAuthAccessToken (payload:$payload) {
                ... on AdminOAuthPersonalAccessTokenResult {
                    accessToken
                    token {
                        id
                        user_id
                        name
                    }
                }
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateOAuthAccessToken ($payload:AdminOAuthAccessTokenInput!) {
            adminUpdateOAuthAccessToken (payload:$payload) {
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
        this.table = 'oauth_access_tokens';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminOAuthAccessToken {
                id 
                user_id
                name
            }
        `;

        super.init();
    }
}

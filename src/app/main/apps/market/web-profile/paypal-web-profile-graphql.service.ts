import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class PaypalWebProfileGraphqlService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query MarketGetPaypalWebProfilesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketPaypalWebProfilesPagination (sql:$sql) {
                total
                objects
                filtered
            }
        }`;

    queryObjects = gql`
        query MarketGetPaypalWebProfiles ($sql:[CoreSQLInput]) {
            coreObjects: marketPaypalWebProfiles (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetPaypalWebProfile ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: marketPaypalWebProfile (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation MarketCreatePaypalWebProfile ($payload:MarketPaypalWebProfileInput!) {
            marketCreatePaypalWebProfile (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdatePaypalWebProfile ($payload:MarketPaypalWebProfileInput!) {
            marketUpdatePaypalWebProfile (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeletePaypalWebProfile ($id:Int!) {
            marketDeletePaypalWebProfile (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        // this.model = 'Syscover\\Market\\Models\\PaypalWebProfile';
        // this.table = 'market_paypal_web_profile';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketPaypalWebProfile {
                    id
                    name
                }
        `;

        super.init();
    }
}

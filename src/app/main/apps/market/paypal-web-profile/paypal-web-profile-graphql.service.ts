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
            coreObjects: marketPaypalWebProfiles (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetPaypalWebProfile ($sql:[CoreSQLInput]) {
            coreObject: marketPaypalWebProfile (sql:$sql) {
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation MarketCreatePaypalWebProfile ($payload:MarketPaypalWebProfileInput!) {
            marketCreatePaypalWebProfile (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdatePaypalWebProfile ($payload:MarketPaypalWebProfileInput!) {
            marketUpdatePaypalWebProfile (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeletePaypalWebProfile ($id:String!) {
            marketDeletePaypalWebProfile (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        // this.model = 'Syscover\\Market\\Models\\PaypalWebProfile';
        this.table = 'market_paypal_web_profile'; // is not a table

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketPaypalWebProfile {
                    id
                    name
                    temporary
                    flow_config {
                        landing_page_type
                        bank_txn_pending_url
                        user_action
                        return_uri_http_method
                    }
                    input_fields {
                        allow_note
                        no_shipping
                        address_override
                    }
                    presentation {
                        brand_name
                        logo_image
                        locale_code
                        return_url_label
                        note_to_seller_label
                    }
                }
        `;

        super.init();
    }
}

import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

@Injectable()
export class PaymentMethodGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query MarketGetPaymentMethodsPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketPaymentMethodsPagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query MarketGetRelationsPaymentMethod ($sqlOrderStatus:[CoreSQLQueryInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetPaymentMethods ($sql:[CoreSQLQueryInput] $sqlOrderStatus:[CoreSQLQueryInput]) {
            coreObjects: marketPaymentMethods (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query MarketGetPaymentMethod ($sql:[CoreSQLQueryInput] $sqlOrderStatus:[CoreSQLQueryInput]) {
            coreObject: marketPaymentMethod (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation MarketAddAction ($object:MarketPaymentMethodInput!) {
            marketAddPaymentMethod (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdatePaymentMethod ($object:MarketPaymentMethodInput!) {
            marketUpdatePaymentMethod (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeletePaymentMethod ($lang_id:String! $id:Int!) {
            marketDeletePaymentMethod (lang_id:$lang_id id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Market\\Models\\PaymentMethod';
        this.table = 'market_payment_method';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketPaymentMethod {
                ix
                id
                lang_id 
                name
                order_status_successful_id
                minimum_price
                maximum_price
                instructions
                sort
                active
                data_lang
            }
        `;

        this.relationsFields = `
            marketOrderStatuses (sql:$sqlOrderStatus){
                ix
                id
                name
            }
        `;

        super.init();
    }
}

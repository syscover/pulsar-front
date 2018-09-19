import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class PaymentMethodGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query MarketGetPaymentMethodsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: marketPaymentMethodsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query MarketGetRelationsPaymentMethod ($sqlOrderStatus:[CoreSQLInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetPaymentMethods ($sql:[CoreSQLInput] $sqlOrderStatus:[CoreSQLInput]) {
            coreObjects: marketPaymentMethods (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query MarketGetPaymentMethod ($sql:[CoreSQLInput] $sqlOrderStatus:[CoreSQLInput]) {
            coreObject: marketPaymentMethod (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
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

    init(): void
    {
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

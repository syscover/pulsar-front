import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class OrderStatusGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query MarketGetOrderStatusesPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketOrderStatusesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query MarketGetOrderStatuses ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketOrderStatuses (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetOrderStatus ($sql:[CoreSQLQueryInput]) {
            coreObject: marketOrderStatus (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation MarketAddOrderStatus ($object:MarketOrderStatusInput!) {
            marketAddOrderStatus (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateOrderStatus ($object:MarketOrderStatusInput!) {
            marketUpdateOrderStatus (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteOrderStatus ($lang_id:String! $id:Int!) {
            marketDeleteOrderStatus (lang_id:$lang_id id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Market\\Models\\OrderStatus';
        this.table = 'market_order_status';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketOrderStatus {
                ix
                id
                lang_id
                name
                active
                data_lang
            }
        `;

        super.init();
    }
}

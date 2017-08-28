import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class StockGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query MarketGetStocksPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketStocksPagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query MarketGetStocks ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketStocks (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetStock ($sql:[CoreSQLQueryInput]) {
            coreObject: marketStock (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation MarketAddStock ($object:MarketStockInput!) {
            marketAddStock (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateStock ($object:MarketStockInput!) {
            marketUpdateStock (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteStock ($id:String! $lang:String!) {
            marketDeleteStock (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Market\\Models\\Stock';
        this.table = 'market_stock';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketStock {
                id
                warehouse_id
                product_id
                stock
                minimum_stock
            }
        `;

        super.init();
    }
}

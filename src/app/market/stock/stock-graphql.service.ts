import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class StockGraphQLService extends GraphQLModel {

    mutationSetStock = gql`
        mutation MarketSetStock ($object:MarketStockInput!) {
            marketSetStock (object:$object){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Market\\Models\\Stock';
        this.table = 'market_stock';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketStock {
                warehouse_id
                product_id
                stock
                minimum_stock
            }
        `;

        super.init();
    }
}

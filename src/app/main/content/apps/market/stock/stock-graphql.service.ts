import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class StockGraphQLService extends GraphQLSchema 
{
    mutationSetStock = gql`
        mutation MarketSetStock ($object:MarketStockInput!) {
            marketSetStock (object:$object){
                ${this.fields}
            }
        }`;

    init() 
    {
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

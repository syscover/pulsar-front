import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';
import { graphQL } from '../../../core/components/marketable/marketable.variables';

@Injectable()
export class WineGraphqlService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query MarketGetWinesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: wineWinesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query marketGetRelationsWine ($sqlCategory:[CoreSQLInput]){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetWines ($sql:[CoreSQLInput]) {
            coreObjects: wineWines (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetWine ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: wineWine (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation MarketCreateWine ($payload:WineWineInput!) {
            marketCreateWine (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateWine ($payload:WineWineInput!) {
            marketUpdateWine (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteWine ($id:Int!) {
            marketDeleteWine (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Wine\\Models\\Wine';
        this.table = 'wine_wine';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on WineWine {
                    id
                    name
                    year
                }
        `;

        this.relationsFields = `
            ${graphQL.relationsFields}
        `;

        super.init();
    }
}

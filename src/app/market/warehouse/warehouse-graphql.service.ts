import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class WarehouseGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query MarketGetWarehousesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketWarehousesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query marketGetRelationsWarehouse ($sqlCountry:[CoreSQLQueryInput]){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetWarehouses ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketWarehouses (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetWarehouse ($sql:[CoreSQLQueryInput] $sqlCountry:[CoreSQLQueryInput]) {
            coreObject: marketWarehouse (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation MarketAddWarehouse ($object:MarketWarehouseInput!) {
            marketAddWarehouse (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateWarehouse ($object:MarketWarehouseInput!) {
            marketUpdateWarehouse (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteWarehouse ($id:Int!) {
            marketDeleteWarehouse (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Market\\Models\\Warehouse';
        this.table = 'market_warehouse';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketWarehouse {
                    id
                    name
                    country_id
                    territorial_area_1_id
                    territorial_area_2_id
                    territorial_area_3_id
                    cp
                    locality
                    address
                    latitude
                    longitude
                    active
                }
        `;

        this.relationsFields = `
            adminCountries (sql:$sqlCountry) {
                id
                lang_id
                name
                territorial_area_1
                territorial_area_2
                territorial_area_3
            }
        `;

        super.init();
    }
}

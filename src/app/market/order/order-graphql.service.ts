import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class OrderGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query MarketGetOrdersPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketOrdersPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject  = gql`
        query MarketGetRelationsProduct (
            $sqlCategory:[CoreSQLQueryInput]
            $sqlAttachmentFamily:[CoreSQLQueryInput]
            $sqlFieldGroup:[CoreSQLQueryInput]
            $sqlProduct:[CoreSQLQueryInput]
            $configProductTypes:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
        ) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetProducts ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketProducts (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetProduct (
            $sql:[CoreSQLQueryInput]
            $sqlCategory:[CoreSQLQueryInput]
            $sqlAttachmentFamily:[CoreSQLQueryInput]
            $sqlFieldGroup:[CoreSQLQueryInput]
            $sqlProduct:[CoreSQLQueryInput]
            $sqlStock:[CoreSQLQueryInput]
            $configProductTypes:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
        ) {
            coreObject: marketProduct (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
            marketStocks (sql:$sqlStock) {
                id
                warehouse_id
                product_id
                stock
                minimum_stock
            }
            marketWarehouses {
                id
                name
            }
        }`;

    mutationAddObject = gql`
        mutation MarketAddProduct ($object:MarketProductInput!) {
            marketAddProduct (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateProduct ($object:MarketProductInput!) {
            marketUpdateProduct (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteProduct ($id:String! $lang:String!) {
            marketDeleteProduct (id:$id lang:$lang){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Market\\Models\\Order';
        this.table = 'market_order';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketOrder {
                id
                date
                customer_name
                customer_surname
                customer_email
                customer_mobile
                status {
                    id
                    lang_id
                    name
                }
                payment_method {
                    id
                    lang_id
                    name
                }
            }
        `;

        this.relationsFields = `
            marketCategories (sql:$sqlCategory) {
                id
                lang_id
                name
            }
            marketProductClassTaxes {
                id
                name
            }
            marketProducts (sql:$sqlProduct) {
                id
                lang_id
                name
                code
            }
            adminFieldGroups (sql:$sqlFieldGroup){
                id
                name
            }
            adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
                id 
                name
                resource_id
                width
                height
                sizes
                quality
                format
            }
            marketProductTypes: coreConfig (config:$configProductTypes) {
                ... on CoreConfigOptionType {
                    id
                    name
                }
            }
            marketPriceTypes: coreConfig (config:$configPriceTypes) {
                ... on CoreConfigOptionType {
                    id
                    name
                }
            }
        `;

        super.init();
    }
}

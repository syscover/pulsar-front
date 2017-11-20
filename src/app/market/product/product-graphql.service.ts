import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class ProductGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query MarketGetProductsPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketProductsPagination (filters:$filters sql:$sql) {
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
        mutation MarketDeleteProduct ($object_id:Int! $lang_id:String!) {
            marketDeleteProduct (object_id:$object_id lang_id:$lang_id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Market\\Models\\Product';
        this.table = 'market_product';
        this.tableLang = 'market_product_lang';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketProduct {
                id
                object_id
                lang_id
                code
                name
                slug
                categories {
                    id
                    lang_id
                    name
                }
                field_group_id
                type_id
                parent_id
                weight
                active
                sort
                price_type_id
                subtotal
                product_class_tax_id
                description
                data_lang
                data
                attachments {
                    id
                    lang_id
                    object_id
                    object_type
                    family_id
                    sort
                    alt
                    title
                    base_path
                    file_name
                    url
                    mime
                    extension
                    size
                    width
                    height
                    library_id
                    library_file_name
                    attachment_library {
                        id
                        name
                        base_path
                        file_name
                        url
                        mime
                        extension
                        size
                        width
                        height
                    }
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
                object_id
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

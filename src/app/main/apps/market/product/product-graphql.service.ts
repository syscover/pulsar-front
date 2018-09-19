import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ProductGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query MarketGetProductsPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketProductsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject  = gql`
        query MarketGetRelationsProduct (
            $sqlCategory:[CoreSQLQueryInput]
            $sqlSection:[CoreSQLQueryInput]
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
            $sqlSection:[CoreSQLQueryInput]
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
        }`;

    mutationCreateObject = gql`
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
        mutation MarketDeleteProduct ($lang_id:String! $id:Int!) {
            marketDeleteProduct (lang_id:$lang_id id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Market\\Models\\Product';
        this.modelLang = 'Syscover\\Market\\Models\\ProductLang';
        this.table = 'market_product';
        this.tableLang = 'market_product_lang';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketProduct {
                ix
                id
                lang_id
                sku
                name
                slug
                categories {
                    ix
                    id
                    lang_id
                    name
                }
                sections {
                    ix
                    id
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
                    ix
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
                ix
                id
                lang_id
                name
            }
            marketSections (sql:$sqlSection) {
                ix
                id
                lang_id
                name
                slug
            }
            marketProductClassTaxes {
                id
                name
            }
            marketProducts (sql:$sqlProduct) {
                ix
                id
                lang_id
                name
                sku
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
                ... on CoreConfigOption {
                    id
                    name
                }
            }
            marketPriceTypes: coreConfig (config:$configPriceTypes) {
                ... on CoreConfigOption {
                    id
                    name
                }
            }
            marketWarehouses {
                id
                name
            }
        `;

        super.init();
    }
}

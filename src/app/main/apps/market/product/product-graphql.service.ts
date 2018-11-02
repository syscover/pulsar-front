import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ProductGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query MarketGetProductsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: marketProductsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject  = gql`
        query MarketGetRelationsProduct (
            $sqlProduct:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $configProductTypes:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlFieldGroup:[CoreSQLInput]
        ) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetProducts ($sql:[CoreSQLInput]) {
            coreObjects: marketProducts (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetProduct (
            $sql:[CoreSQLInput]
            $sqlProduct:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $configProductTypes:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlFieldGroup:[CoreSQLInput]
            $sqlStock:[CoreSQLInput]
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
        mutation MarketCreateProduct ($payload:MarketProductInput!) {
            marketCreateProduct (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateProduct ($payload:MarketProductInput!) {
            marketUpdateProduct (payload:$payload){
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
                attachments {
                    alt
                    base_path
                    extension
                    family_id
                    file_name
                    height
                    id
                    ix
                    lang_id
                    library_file_name
                    library_id
                    mime
                    object_id
                    object_type
                    sort
                    title
                    url
                    size
                    width
                    attachment_library {
                        base_path
                        extension
                        file_name
                        height
                        id
                        mime
                        name
                        size
                        url
                        width
                    }
                }
                data
                data_lang
                description
                field_group_id
                id
                ix
                
                active
                categories {
                    id
                    ix
                    lang_id
                    name
                }
                lang_id
                name
                parent_id
                price_type_id
                product_class_tax_id
                sections {
                    ix
                    id
                    name
                }
                sku
                slug
                sort
                subtotal
                type_id
                weight
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
            adminFieldGroups (sql:$sqlFieldGroup) {
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
            marketProductTypes: coreConfig (config:$configProductTypes)
            marketPriceTypes: coreConfig (config:$configPriceTypes)
            marketWarehouses {
                id
                name
            }
        `;

        super.init();
    }
}

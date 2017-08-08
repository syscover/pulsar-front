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
            $configProductTypes:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
        ) {
            coreObject: marketProduct (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
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
        this.model = 'Syscover\\Market\\Models\\Product';
        this.table = 'product';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketProduct {
                id
                lang_id
                name
                slug
                field_group_id
                product_type_id
                parent_product_id
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
                    name
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
                lang_id
                name
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

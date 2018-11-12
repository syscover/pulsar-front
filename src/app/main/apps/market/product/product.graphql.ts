import gql from 'graphql-tag';
import { graphQL as marketableGraphQL } from '../../../core/components/marketable/marketable.graphql';
import { graphQL as stockableGraphQL } from '../../../core/components/stockable/stockable.graphql';
import { graphQL as attachmentsGraphQL } from '../../../core/components/attachments/attachments.graphql';

const fields = `
    attachments {
        ${attachmentsGraphQL.fields}
    }
    data
    data_lang
    description
    field_group_id
    id
    ix
    ${marketableGraphQL.fields}
`;

const relationsFields = `
    adminFieldGroups (sql:$sqlFieldGroup) {
        id
        name
    }
    
    ${attachmentsGraphQL.relationsFields}
    ${marketableGraphQL.relationsFields}
    ${stockableGraphQL.relationsFields}
`;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\Product',
    modelLang: 'Syscover\\Market\\Models\\ProductLang',
    table: 'market_product',
    tableLang: 'market_product_lang',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetProductsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: marketProductsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query MarketGetRelationsProduct (
            $sqlProduct:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $configProductClasses:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlFieldGroup:[CoreSQLInput]
        ) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetProducts ($sql:[CoreSQLInput]) {
            coreObjects: marketProducts (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetProduct (
            $sql:[CoreSQLInput]
            $sqlProduct:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $configProductClasses:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlFieldGroup:[CoreSQLInput]
            $sqlStock:[CoreSQLInput]
        ) {
            coreObject: marketProduct (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
            marketStocks (sql:$sqlStock) {
                warehouse_id
                product_id
                stock
                minimum_stock
            }
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateProduct ($payload:MarketProductInput!) {
            marketCreateProduct (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateProduct ($payload:MarketProductInput!) {
            marketUpdateProduct (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteProduct ($id:Int! $lang_id:String!) {
            marketDeleteProduct (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

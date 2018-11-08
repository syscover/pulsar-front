import gql from 'graphql-tag';
import { graphQL as marketableGraphQL } from '../../../core/components/marketable/marketable.graphql';
import { graphQL as stockableGraphQL } from '../../../core/components/stockable/stockable.graphql';
import { graphQL as adminAttachmentsGraphQL } from '../../../core/components/attachments/attachments.graphql';
import { graphQL as marketCategoryGraphQL } from '../../market/category/category.graphql';

const fields = `
    ... on WineWine {
        data
        data_lang
        id
        is_product
        ix
        lang_id
        name
        product_id
        slug
        tasting_note
        year
        
        ${adminAttachmentsGraphQL.fields}
        ${marketCategoryGraphQL.fields}
        ${marketableGraphQL.fields}
    }
`;

const relationsFields = `
    ${adminAttachmentsGraphQL.relationsFields}
    ${marketableGraphQL.relationsFields}
    ${stockableGraphQL.relationsFields}
`;

export const graphQL = {

    model: 'Syscover\\Wine\\Models\\Wine',
    modelLang: 'Syscover\\Wine\\Models\\WineLang',
    table: 'wine_wine',
    tableLang: 'wine_wine_lang',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query WineGetWinesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: wineWinesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query WineGetRelationsWine (
            $configPriceTypes:CoreConfigInput!
            $configProductTypes:CoreConfigInput!
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput] 
            $sqlProduct:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
        ){
            ${relationsFields}
        }`,

    queryObjects: gql`
        query WineGetWines ($sql:[CoreSQLInput]) {
            coreObjects: wineWines (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetWine (
            $configPriceTypes:CoreConfigInput!
            $configProductTypes:CoreConfigInput!
            $sql:[CoreSQLInput] 
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlProduct:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $sqlStock:[CoreSQLInput]
        ) {
            coreObject: wineWine (sql:$sql) {
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
        mutation WineCreateWine ($payload:WineWineInput!) {
            wineCreateWine (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdateWine ($payload:WineWineInput!) {
            wineUpdateWine (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeleteWine ($lang_id:String! $id:Int!) {
            wineDeleteWine (lang_id:$lang_id id:$id) {
                ${fields}
            }
        }`
};

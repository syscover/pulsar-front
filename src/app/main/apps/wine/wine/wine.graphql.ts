import gql from 'graphql-tag';
import { graphQL as marketableGraphQL } from '../../../core/components/marketable/marketable.graphql';
import { graphQL as stockableGraphQL } from '../../../core/components/stockable/stockable.graphql';
import { graphQL as adminAttachmentsGraphQL } from '../../../core/components/attachments/attachments.graphql';
import { graphQL as adminAttachmentFamilyGraphQL } from '../../admin/attachment-family/attachment-family.graphql';
import { graphQL as adminCountryGraphQL } from '../../admin/country/country.graphql';
import { graphQL as marketCategoryGraphQL } from '../../market/category/category.graphql';
import { graphQL as marketStockGraphQL } from '../../market/stock/stock.graphql';
import { graphQL as wineAppellationGraphQL } from '../appellation/appellation.graphql';
import { graphQL as wineAwardGraphQL } from '../award/award.graphql';
import { graphQL as wineFamilyGraphQL } from '../family/family.graphql';
import { graphQL as wineGrapeGraphQL } from '../grape/grape.graphql';
import { graphQL as winePairingGraphQL } from '../pairing/pairing.graphql';
import { graphQL as winePresentationGraphQL } from '../presentation/presentation.graphql';
import { graphQL as wineTypeGraphQL } from '../type/type.graphql';
import { graphQL as wineWineryGraphQL } from '../winery/winery.graphql';

const fields = `
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
`;

const relationsFields = `
    adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
        ${adminAttachmentFamilyGraphQL.fields}
    }
    adminCountries (sql:$sqlCountry) {
        ${adminCountryGraphQL.fields}
    }
    wineAppellations (sql:$sqlAppellation) {
        ${wineAppellationGraphQL.fields}
    }
    wineAwards (sql:$sqlAward) {
        ${wineAwardGraphQL.fields}
    }
    wineFamilies (sql:$sqlFamily) {
        ${wineFamilyGraphQL.fields}
    }
    wineGrapes (sql:$sqlGrape) {
        ${wineGrapeGraphQL.fields}
    }
    winePairings (sql:$sqlPairing) {
        ${winePairingGraphQL.fields}
    }
    winePresentations (sql:$sqlPresentation) {
        ${winePresentationGraphQL.fields}
    }
    wineTypes (sql:$sqlType) {
        ${wineTypeGraphQL.fields}
    }
    wineWineries (sql:$sqlWinery) {
        ${wineWineryGraphQL.fields}
    }
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
            $sqlCountry:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput] 
            $sqlProduct:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $sqlAppellation:[CoreSQLInput]
            $sqlAward:[CoreSQLInput]
            $sqlFamily:[CoreSQLInput]
            $sqlGrape:[CoreSQLInput]
            $sqlPairing:[CoreSQLInput]
            $sqlPresentation:[CoreSQLInput]
            $sqlType:[CoreSQLInput]
            $sqlWinery:[CoreSQLInput]
        ) {
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
            $sqlCountry:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlProduct:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $sqlStock:[CoreSQLInput]
            $sqlAppellation:[CoreSQLInput]
            $sqlAward:[CoreSQLInput]
            $sqlFamily:[CoreSQLInput]
            $sqlGrape:[CoreSQLInput]
            $sqlPairing:[CoreSQLInput]
            $sqlPresentation:[CoreSQLInput]    
            $sqlType:[CoreSQLInput]
            $sqlWinery:[CoreSQLInput]
        ) {
            coreObject: wineWine (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
            marketStocks (sql:$sqlStock) {
                ${marketStockGraphQL.fields}
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

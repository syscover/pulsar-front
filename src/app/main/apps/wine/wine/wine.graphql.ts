import gql from 'graphql-tag';
import { graphQL as marketableGraphQL } from '@horus/components/marketable/marketable.graphql';
import { graphQL as stockableGraphQL } from '@horus/components/stockable/stockable.graphql';
import { graphQL as adminAttachmentsGraphQL } from '@horus/components/attachments/attachments.graphql';
import { graphQL as adminAttachmentFamilyGraphQL } from '../../admin/attachment-family/attachment-family.graphql';
import { graphQL as adminCountryGraphQL } from '../../admin/country/country.graphql';
import { graphQL as marketStockGraphQL } from '../../market/stock/stock.graphql';
import { graphQL as wineAppellationGraphQL } from './../appellation/appellation.graphql';
import { graphQL as wineAwardGraphQL } from './../award/award.graphql';
import { graphQL as wineFamilyGraphQL } from './../family/family.graphql';
import { graphQL as wineGrapeGraphQL } from './../grape/grape.graphql';
import { graphQL as winePairingGraphQL } from './../pairing/pairing.graphql';
import { graphQL as winePresentationGraphQL } from './../presentation/presentation.graphql';
import { graphQL as wineTypeGraphQL } from './../type/type.graphql';
import { graphQL as wineWineryGraphQL } from './../winery/winery.graphql';

const relationsFields = `
    adminCountries (sql:$sqlCountry) {
        ${adminCountryGraphQL.fields}
    }
    adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
        ${adminAttachmentFamilyGraphQL.fields}
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

const fields = `
    abv
    appellation_id
    attachments {
        ${adminAttachmentsGraphQL.fields}
    }
    awards {
        ${wineAwardGraphQL.fields}
    }
    country_id
    data
    data_lang
    decanter
    description
    family_id
    grapes {
        ${wineGrapeGraphQL.fields}
        composition {
            percentage
        }
    }
    id
    is_product
    ix
    lang_id
    name
    pairings {
        ${winePairingGraphQL.fields}
    }
    parker
    penin
    presentation_id
    product_id
    production
    score_average
    suckling
    tasting
    tasting_look
    tasting_nose
    tasting_mouth
    tasting_temperature
    tasting_consumption
    territorial_area_1_id
    territorial_area_2_id
    territorial_area_3_id
    type_id
    vineyard
    vineyard_name
    vineyard_area
    vineyard_description
    vineyard_age
    vineyard_soil
    vineyard_weather
    vineyard_performance
    vineyard_vintage
    vineyard_vinification
    vineyard_aging
    vineyard_bottling
    vintage
    wine_spectator
    winery_id
    
    ${marketableGraphQL.fields}
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
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCountry:[CoreSQLInput]
            $sqlAppellation:[CoreSQLInput]
            $sqlAward:[CoreSQLInput]
            $sqlFamily:[CoreSQLInput]
            $sqlGrape:[CoreSQLInput]
            $sqlPairing:[CoreSQLInput]
            $sqlPresentation:[CoreSQLInput]
            $sqlType:[CoreSQLInput]
            $sqlWinery:[CoreSQLInput]
            ${marketableGraphQL.paramenters}
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
            $sql:[CoreSQLInput] 
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCountry:[CoreSQLInput]
            $sqlStock:[CoreSQLInput]
            $sqlAppellation:[CoreSQLInput]
            $sqlAward:[CoreSQLInput]
            $sqlFamily:[CoreSQLInput]
            $sqlGrape:[CoreSQLInput]
            $sqlPairing:[CoreSQLInput]
            $sqlPresentation:[CoreSQLInput]    
            $sqlType:[CoreSQLInput]
            $sqlWinery:[CoreSQLInput]
            ${marketableGraphQL.paramenters}
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

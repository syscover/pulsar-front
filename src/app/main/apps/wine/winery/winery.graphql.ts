import gql from 'graphql-tag';
import { graphQL as attachmentsGraphQL } from '../../../core/components/attachments/attachments.graphql';
import { graphQL as countryGraphQL } from '../../admin/country/country.graphql';

const fields = `
    ... on WineWinery {
        address
        attachments
        country_id
        data
        data_lang
        description
        excerpt
        header
        id
        ix
        lang_id
        latitude
        locality
        longitude
        name
        slug
        territorial_area_1_id
        territorial_area_2_id
        territorial_area_3_id
        zip
    }
`;

const relationsFields = `
    adminCountries (sql:$sqlCountry) {
        id
        lang_id
        name
        territorial_area_1
        territorial_area_2
        territorial_area_3
        zones
    }
`;

export const graphQL = {

    model: 'Syscover\\Wine\\Models\\Winery',
    modelLang: 'Syscover\\Wine\\Models\\WineryLang',
    table: 'wine_winery',
    tableLang: 'wine_winery_lang',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query WineGetWineriesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: wineWineriesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query WineGetRelationsWinery (
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCountry:[CoreSQLInput]
        ){
            ${relationsFields}
        }`,

    queryObjects: gql`
        query WineGetWineries ($sql:[CoreSQLInput]) {
            coreObjects: wineWineries (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetWinery (
            $sql:[CoreSQLInput] 
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCountry:[CoreSQLInput]
        ) {
            coreObject: wineWinery (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation WineCreateWinery ($payload:WineWineryInput!) {
            wineCreateWinery (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdateWinery ($payload:WineWineryInput!) {
            wineUpdateWinery (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeleteWinery ($lang_id:String! $id:Int!) {
            wineDeleteWinery (lang_id:$lang_id id:$id) {
                ${fields}
            }
        }`
};

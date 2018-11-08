import gql from 'graphql-tag';
import { graphQL as adminAttachmentFamilyGraphQL } from '../../admin/attachment-family/attachment-family.graphql';
import { graphQL as adminCountryGraphQL } from '../../admin/country/country.graphql';

const fields = `
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
    name
    slug
`;

const relationsFields = `
    adminCountries (sql:$sqlCountry) {
        ${adminCountryGraphQL.fields}
    }
    adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
        ${adminAttachmentFamilyGraphQL.fields}
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

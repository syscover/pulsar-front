import gql from 'graphql-tag';
import { graphQL as marketableGraphQL } from '../../../core/components/marketable/marketable.graphql';

const fields = `
    ... on WineWine {
            data
            data_lang
            id
            is_product
            ix
            lang_id
            name
            slug
            year
            
            ${marketableGraphQL.fields}
        }
`;

const relationsFields = `
    ${marketableGraphQL.relationsFields}
`;

export const graphQL = {

    model: 'Syscover\\Wine\\Models\\Wine',
    modelLang: 'Syscover\\Wine\\Models\\WineLang',
    table: 'wine_wine',
    tableLang: 'wine_wine_lang',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query WineGetWinesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: wineWinesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query WineGetRelationsWine (
            $sqlProduct:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput] 
            $sqlSection:[CoreSQLInput]
            $configProductTypes:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
        ){
            ${relationsFields}
        }`,

    queryObjects: gql`
        query WineGetWines ($sql:[CoreSQLInput]) {
            coreObjects: wineWines (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetWine (
            $sql:[CoreSQLInput] 
            $sqlProduct:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $configProductTypes:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
        ) {
            coreObject: wineWine (sql:$sql){
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation WineCreateWine ($payload:WineWineInput!) {
            wineCreateWine (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdateWine ($payload:WineWineInput!) {
            wineUpdateWine (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeleteWine ($id:Int!) {
            wineDeleteWine (id:$id){
                ${fields}
            }
        }`
};

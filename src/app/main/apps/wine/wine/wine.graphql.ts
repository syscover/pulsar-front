import gql from 'graphql-tag';
import { graphQL as marketableGraphQL } from '../../../core/components/marketable/marketable.graphql';

const fields = `
            ... on WineWine {
                    id
                    name
                    year
                }
        `;

const relationsFields = `
            ${marketableGraphQL.relationsFields}
        `;

export const graphQL = {

    model: 'Syscover\\Wine\\Models\\Wine',

    table: 'wine_wine',

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
        query WineGetRelationsWine ($sqlCategory:[CoreSQLInput] $sqlProduct:[CoreSQLInput]){
            ${relationsFields}
        }`,

    queryObjects: gql`
        query WineGetWines ($sql:[CoreSQLInput]) {
            coreObjects: wineWines (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetWine ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
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

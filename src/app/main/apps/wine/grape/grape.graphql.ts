import gql from 'graphql-tag';

const fields = `
    ... on WineGrape {
        data_lang
        description
        id
        ix
        lang_id
        name
        slug
    }
`;

export const graphQL = {

    model: 'Syscover\\Wine\\Models\\Grape',
    table: 'wine_grape',
    fields,

    queryPaginationObject: gql`
        query WineGetGrapesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: wineGrapesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query WineGetGrapes ($sql:[CoreSQLInput]) {
            coreObjects: wineGrapes (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetGrape (
            $sql:[CoreSQLInput]
        ) {
            coreObject: wineGrape (sql:$sql){
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation WineCreateGrape ($payload:WineGrapeInput!) {
            wineCreateGrape (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdateGrape ($payload:WineGrapeInput!) {
            wineUpdateGrape (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeleteGrape ($id:Int! $lang_id:String!) {
            wineDeleteGrape (id:$id lang_id:$lang_id){
                ${fields}
            }
        }`
};

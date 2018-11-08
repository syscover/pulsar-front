import gql from 'graphql-tag';

const fields = `
    data_lang
    description
    id
    ix
    lang_id
    name
    slug
`;

const relationsFields = ``;

export const graphQL = {

    model: 'Syscover\\Wine\\Models\\Appellation',
    table: 'wine_appellation',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query WineGetAppellationsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: wineAppellationsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query WineGetAppellations ($sql:[CoreSQLInput]) {
            coreObjects: wineAppellations (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetAppellation (
            $sql:[CoreSQLInput]
        ) {
            coreObject: wineAppellation (sql:$sql){
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation WineCreateAppellation ($payload:WineAppellationInput!) {
            wineCreateAppellation (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdateAppellation ($payload:WineAppellationInput!) {
            wineUpdateAppellation (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeleteAppellation ($id:Int! $lang_id:String!) {
            wineDeleteAppellation (id:$id lang_id:$lang_id){
                ${fields}
            }
        }`
};

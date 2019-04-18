import gql from 'graphql-tag';

const fields = `
    data_lang
    id
    ix
    lang_id
    name
    slug
`;

const relationsFields = ``;

export const graphQL = {

    model: 'Syscover\\Wine\\Models\\Award',
    table: 'wine_award',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query WineGetAwardsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: wineAwardsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query WineGetAwards ($sql:[CoreSQLInput]) {
            coreObjects: wineAwards (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetAward (
            $sql:[CoreSQLInput]
        ) {
            coreObject: wineAward (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation WineCreateAward ($payload:WineAwardInput!) {
            wineCreateAward (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdateAward ($payload:WineAwardInput!) {
            wineUpdateAward (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeleteAward ($id:Int! $lang_id:Int!) {
            wineDeleteAward (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

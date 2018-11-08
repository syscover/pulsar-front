import gql from 'graphql-tag';

const fields = `
    ... on WinePairing {
        data_lang
        id
        ix
        lang_id
        name
        slug
    }
`;

export const graphQL = {

    model: 'Syscover\\Wine\\Models\\Pairing',
    table: 'wine_pairing',
    fields,

    queryPaginationObject: gql`
        query WineGetPairingsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: winePairingsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query WineGetPairings ($sql:[CoreSQLInput]) {
            coreObjects: winePairings (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetPairing (
            $sql:[CoreSQLInput]
        ) {
            coreObject: winePairing (sql:$sql){
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation WineCreatePairing ($payload:WinePairingInput!) {
            wineCreatePairing (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdatePairing ($payload:WinePairingInput!) {
            wineUpdatePairing (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeletePairing ($id:Int! $lang_id:String!) {
            wineDeletePairing (id:$id lang_id:$lang_id){
                ${fields}
            }
        }`
};

import gql from 'graphql-tag';

const fields = `
    ... on WinePresentation {
        data_lang
        id
        ix
        lang_id
        name
        slug
    }
`;

const relationsFields = ``;

export const graphQL = {

    model: 'Syscover\\Wine\\Models\\Presentation',
    table: 'wine_presentation',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query WineGetPresentationsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: winePresentationsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query WineGetPresentations ($sql:[CoreSQLInput]) {
            coreObjects: winePresentations (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetPresentation (
            $sql:[CoreSQLInput]
        ) {
            coreObject: winePresentation (sql:$sql){
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation WineCreatePresentation ($payload:WinePresentationInput!) {
            wineCreatePresentation (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdatePresentation ($payload:WinePresentationInput!) {
            wineUpdatePresentation (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeletePresentation ($id:Int! $lang_id:String!) {
            wineDeletePresentation (id:$id lang_id:$lang_id){
                ${fields}
            }
        }`
};

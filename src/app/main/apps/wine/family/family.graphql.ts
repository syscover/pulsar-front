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

    model: 'Syscover\\Wine\\Models\\Family',
    table: 'wine_family',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query WineGetFamiliesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: wineFamiliesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query WineGetFamilies ($sql:[CoreSQLInput]) {
            coreObjects: wineFamilies (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetFamily (
            $sql:[CoreSQLInput]
        ) {
            coreObject: wineFamily (sql:$sql){
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation WineCreateFamily ($payload:WineFamilyInput!) {
            wineCreateFamily (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdateFamily ($payload:WineFamilyInput!) {
            wineUpdateFamily (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeleteFamily ($id:Int! $lang_id:String!) {
            wineDeleteFamily (id:$id lang_id:$lang_id){
                ${fields}
            }
        }`
};

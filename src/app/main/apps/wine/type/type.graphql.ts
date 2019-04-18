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

    model: 'Syscover\\Wine\\Models\\Type',
    table: 'wine_type',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query WineGetTypesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: wineTypesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query WineGetTypes ($sql:[CoreSQLInput]) {
            coreObjects: wineTypes (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query WineGetType (
            $sql:[CoreSQLInput]
        ) {
            coreObject: wineType (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation WineCreateType ($payload:WineTypeInput!) {
            wineCreateType (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation WineUpdateType ($payload:WineTypeInput!) {
            wineUpdateType (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation WineDeleteType ($id:Int! $lang_id:Int!) {
            wineDeleteType (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

import gql from 'graphql-tag';

const fields = `
    ix
    id
    lang_id
    name
    slug
`;

const relationsFields = ``;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\Section',
    table: 'market_section',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetSectionsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: marketSectionsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query MarketGetSections ($sql:[CoreSQLInput]) {
            coreObjects: marketSections (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetSection ($sql:[CoreSQLInput]) {
            coreObject: marketSection (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateSection ($payload:MarketSectionInput!) {
            marketCreateSection (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateSection ($payload:MarketSectionInput!) {
            marketUpdateSection (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteSection ($id:String! $lang_id:Int!) {
            marketDeleteSection (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

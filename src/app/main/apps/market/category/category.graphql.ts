import gql from 'graphql-tag';

const fields = `
    ix
    id
    lang_id
    parent_id
    name
    slug
    active
    description
    data_lang
`;

const relationsFields = `
    marketCategories (sql:$sqlCategory) {
        ix
        id
        lang_id
        name
    }
`;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\Category',
    table: 'market_category',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetCategoriesPagination ($sql:[CoreSQLInput] $filters:[CoreSQLInput] $sqlCategory:[CoreSQLInput]) {
            coreObjectsPagination: marketCategoriesPagination (sql:$sql filters:$filters) {
                total
                objects (sql:$sql filters:$filters)
                filtered
            }
            ${relationsFields}
        }`,

    queryRelationsObject : gql`
        query MarketGetRelationsCategory ($sqlCategory:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetCategories ($sql:[CoreSQLInput]) {
            coreObjects: marketCategories (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetCategory ($sql:[CoreSQLInput] $sqlCategory:[CoreSQLInput]) {
            coreObject: marketCategory (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateCategory ($payload:MarketCategoryInput!) {
            marketCreateCategory (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateCategory ($payload:MarketCategoryInput!) {
            marketUpdateCategory (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteCategory ($id:Int! $lang_id:String!) {
            marketDeleteCategory (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

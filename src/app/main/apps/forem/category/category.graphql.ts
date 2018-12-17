import gql from 'graphql-tag';

const fields = `
    id
    name
    slug
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Category',
    table: 'forem_category',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetCategoriesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremCategoriesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query ForemGetCategories ($sql:[CoreSQLInput]) {
            coreObjects: foremCategories (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ForemGetCategory ($sql:[CoreSQLInput]) {
            coreObject: foremCategory (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateCategory ($payload:ForemCategoryInput!) {
            foremCreateCategory (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateCategory ($payload:ForemCategoryInput!) {
            foremUpdateCategory (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteCategory ($id:Int!) {
            foremDeleteCategory (id:$id) {
                ${fields}
            }
        }`
};

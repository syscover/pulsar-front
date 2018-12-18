import gql from 'graphql-tag';
import { graphQL as foremCategoryGraphQL } from './../category/category.graphql';

const fields = `
    id
    code
    name
    slug
    category_id
    target_id
    assistance_id
    type_id
    hours
    online
    subsidized
    price    
    price_hour    
    contents    
    requirements   
    observations
`;

const relationsFields = `
    foremCategories {
        ${foremCategoryGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Action',
    table: 'forem_action',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetActionsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremActionsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query ForemGetRelationsCategory ($sqlCountry:[CoreSQLInput]){
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ForemGetActions ($sql:[CoreSQLInput]) {
            coreObjects: foremActions (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query ForemGetAction ($sql:[CoreSQLInput]) {
            coreObject: foremAction (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateAction ($payload:ForemActionInput!) {
            foremCreateAction (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateAction ($payload:ForemActionInput!) {
            foremUpdateAction (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteAction ($id:Int!) {
            foremDeleteAction (id:$id) {
                ${fields}
            }
        }`
};

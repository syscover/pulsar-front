import gql from 'graphql-tag';
import { graphQL as foremCategoryGraphQL } from '../category/category.graphql';

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
    foremTargets: coreConfig (config:$configTargets)
    foremAssistances: coreConfig (config:$configAssistances)
    foremTypes: coreConfig (config:$configTypes)
`;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Group',
    table: 'forem_group',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetGroupsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremGroupsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query ForemGetRelationsCategory ($configTargets:CoreConfigInput $configAssistances:CoreConfigInput $configTypes:CoreConfigInput) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ForemGetGroups ($sql:[CoreSQLInput] $configTargets:CoreConfigInput $configAssistances:CoreConfigInput $configTypes:CoreConfigInput) {
            coreObjects: foremGroups (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query ForemGetGroup ($sql:[CoreSQLInput] $configTargets:CoreConfigInput $configAssistances:CoreConfigInput $configTypes:CoreConfigInput) {
            coreObject: foremGroup (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateGroup ($payload:ForemGroupInput!) {
            foremCreateGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateGroup ($payload:ForemGroupInput!) {
            foremUpdateGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteGroup ($id:Int!) {
            foremDeleteGroup (id:$id) {
                ${fields}
            }
        }`
};

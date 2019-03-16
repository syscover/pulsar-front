import gql from 'graphql-tag';
import { graphQL as foremProvinceGraphQL } from '../province/province.graphql';

const fields = `
    id
    code
    province_id
    group {
        ${foremProvinceGraphQL.fields}
    }
    name
`;

const relationsFields = `
    foremProvinces {
        ${foremProvinceGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Locality',
    table: 'forem_locality',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetLocalitiesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremLocalitiesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query ForemGetRelationsLocality {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ForemGetLocalities ($sql:[CoreSQLInput]) {
            coreObjects: foremLocalities (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query ForemGetLocality ($sql:[CoreSQLInput]) {
            coreObject: foremLocality (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateLocality ($payload:ForemLocalityInput!) {
            foremCreateLocality (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateLocality ($payload:ForemLocalityInput!) {
            foremUpdateLocality (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteLocality ($id:Int!) {
            foremDeleteLocality (id:$id) {
                ${fields}
            }
        }`
};

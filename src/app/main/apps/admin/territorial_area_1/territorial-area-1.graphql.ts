import gql from 'graphql-tag';
import { graphQL as adminCountryGraphQL } from '../country/country.graphql';

const fields = `   
    ix
    id
    country_id
    name
    slug
`;

const relationsFields = `
    adminCountry: adminCountry (sql:$sqlCountry) {
        ${adminCountryGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\TerritorialArea1',
    table: 'admin_territorial_area_1',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetTerritorialAreas1Pagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObjectsPagination: adminTerritorialAreas1Pagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            ${relationsFields}
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsTerritorialArea1 ($sqlCountry:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetTerritorialAreas1 ($sql:[CoreSQLInput]) {
            coreObjects: adminTerritorialAreas1 (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminTerritorialArea1 ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: adminTerritorialArea1 (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateTerritorialArea1 ($payload:AdminTerritorialArea1Input!) {
            adminCreateTerritorialArea1 (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateTerritorialArea1 ($payload:AdminTerritorialArea1Input!) {
            adminUpdateTerritorialArea1 (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteTerritorialArea1 ($id:String!) {
            adminDeleteTerritorialArea1 (id:$id) {
                ${fields}
            }
        }`
};

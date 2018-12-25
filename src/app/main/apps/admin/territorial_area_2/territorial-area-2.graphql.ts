import gql from 'graphql-tag';
import { graphQL as adminTerritorialArea1GraphQL } from './../territorial_area_1/territorial-area-1.graphql';

const fields = `   
    ix
    id
    country_id
    territorial_area_1_id
    name
    slug
`;

const relationsFields = `
    adminCountry: adminCountry (sql:$sqlCountry) {
        ix
        id
        lang_id
        name
        slug
        sort
        prefix
        territorial_area_1
        territorial_areas_1 {
            ${adminTerritorialArea1GraphQL.fields}
        }
        territorial_area_2
        territorial_area_3
        zones
        data_lang
    }
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\TerritorialArea2',
    table: 'admin_territorial_area_2',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetTerritorialAreas2Pagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObjectsPagination: adminTerritorialAreas2Pagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            ${relationsFields}
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsTerritorialArea2 ($sqlCountry:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetTerritorialAreas2 ($sql:[CoreSQLInput]) {
            coreObjects: adminTerritorialAreas2 (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminTerritorialArea2 ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: adminTerritorialArea2 (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateTerritorialArea2 ($payload:AdminTerritorialArea2Input!) {
            adminCreateTerritorialArea2 (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateTerritorialArea2 ($payload:AdminTerritorialArea2Input!) {
            adminUpdateTerritorialArea2 (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteTerritorialArea2 ($id:String!) {
            adminDeleteTerritorialArea2 (id:$id) {
                ${fields}
            }
        }`
};

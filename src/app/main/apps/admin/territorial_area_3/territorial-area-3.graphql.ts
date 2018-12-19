import gql from 'graphql-tag';
import { graphQL as adminTerritorialArea1GraphQL } from '../territorial_area_1/territorial-area-1.graphql';
import { graphQL as adminTerritorialArea2GraphQL } from '../territorial_area_2/territorial-area-2.graphql';

const fields = `   
    ix
    id
    country_id
    territorial_area_1_id
    territorial_area_2_id
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
        territorial_areas_2 {
            ${adminTerritorialArea2GraphQL.fields}
        }
        territorial_area_3
        zones
        data_lang
    }
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\TerritorialArea3',
    table: 'admin_territorial_area_3',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetTerritorialAreas3Pagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObjectsPagination: adminTerritorialAreas3Pagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            ${relationsFields}
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsTerritorialArea3 ($sqlCountry:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetTerritorialAreas3 ($sql:[CoreSQLInput]) {
            coreObjects: adminTerritorialAreas3 (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminTerritorialArea3 ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: adminTerritorialArea3 (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateTerritorialArea3 ($payload:AdminTerritorialArea3Input!) {
            adminCreateTerritorialArea3 (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateTerritorialArea3 ($payload:AdminTerritorialArea3Input!) {
            adminUpdateTerritorialArea3 (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteTerritorialArea3 ($id:String!) {
            adminDeleteTerritorialArea3 (id:$id) {
                ${fields}
            }
        }`
};

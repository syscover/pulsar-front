import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class TerritorialArea3GraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetTerritorialAreas3Pagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObjectsPagination: adminTerritorialAreas3Pagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            ${this.relationsFields}
        }`;

    queryRelationsObject  = gql`
        query AdminGetRelationsTerritorialArea3 ($sqlCountry:[CoreSQLInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetTerritorialAreas3 ($sql:[CoreSQLInput]) {
            coreObjects: adminTerritorialAreas3 (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminTerritorialArea3 ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: adminTerritorialArea3 (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateTerritorialArea3 ($payload:AdminTerritorialArea3Input!) {
            adminCreateTerritorialArea3 (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateTerritorialArea3 ($payload:AdminTerritorialArea3Input!) {
            adminUpdateTerritorialArea3 (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteTerritorialArea3 ($id:String!) {
            adminDeleteTerritorialArea3 (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\TerritorialArea3';
        this.table = 'admin_territorial_area_3';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminTerritorialArea3 {
                ix
                id
                country_id
                territorial_area_1_id
                territorial_area_2_id
                name
                slug
            }
        `;

        this.relationsFields = `
            adminCountry: adminCountry (sql:$sqlCountry){
                ix
                id
                lang_id
                name
                slug
                sort
                prefix
                territorial_area_1
                territorial_areas_1 {
                    ix
                    id
                    country_id
                    name
                    slug
                }
                territorial_area_2
                territorial_areas_2 {
                    ix
                    id
                    country_id
                    territorial_area_1_id
                    name
                    slug
                }
                territorial_area_3
                zones
                data_lang
            }
        `;

        super.init();
    }
}

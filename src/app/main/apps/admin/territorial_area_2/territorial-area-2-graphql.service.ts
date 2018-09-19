import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class TerritorialArea2GraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetTerritorialAreas2Pagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput] $sqlCountry:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminTerritorialAreas2Pagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            ${this.relationsFields}
        }`;

    queryRelationsObject  = gql`
        query AdminGetRelationsTerritorialArea2 ($sqlCountry:[CoreSQLQueryInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetTerritorialAreas2 ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminTerritorialAreas2 (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminTerritorialArea2 ($sql:[CoreSQLQueryInput] $sqlCountry:[CoreSQLQueryInput]) {
            coreObject: adminTerritorialArea2 (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation AdminAddTerritorialArea2 ($object:AdminTerritorialArea2Input!) {
            adminAddTerritorialArea2 (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateTerritorialArea2 ($object:AdminTerritorialArea2Input!) {
            adminUpdateTerritorialArea2 (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteTerritorialArea2 ($id:String!) {
            adminDeleteTerritorialArea2 (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\TerritorialArea2';
        this.table = 'admin_territorial_area_2';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminTerritorialArea2 {
                ix
                id
                country_id
                territorial_area_1_id
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
                territorial_area_3
                zones
                data_lang
            }
        `;

        super.init();
    }
}

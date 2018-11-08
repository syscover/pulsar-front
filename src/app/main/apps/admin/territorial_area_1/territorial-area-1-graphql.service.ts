import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class TerritorialArea1GraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetTerritorialAreas1Pagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObjectsPagination: adminTerritorialAreas1Pagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            ${this.relationsFields}
        }`;

    queryRelationsObject  = gql`
        query AdminGetRelationsTerritorialArea1 ($sqlCountry:[CoreSQLInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetTerritorialAreas1 ($sql:[CoreSQLInput]) {
            coreObjects: adminTerritorialAreas1 (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminTerritorialArea1 ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: adminTerritorialArea1 (sql:$sql) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateTerritorialArea1 ($payload:AdminTerritorialArea1Input!) {
            adminCreateTerritorialArea1 (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateTerritorialArea1 ($payload:AdminTerritorialArea1Input!) {
            adminUpdateTerritorialArea1 (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteTerritorialArea1 ($id:String!) {
            adminDeleteTerritorialArea1 (id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\TerritorialArea1';
        this.table = 'admin_territorial_area_1';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminTerritorialArea1 {
                ix
                id
                country_id
                name
                slug
            }
        `;

        this.relationsFields = `
            adminCountry: adminCountry (sql:$sqlCountry) {
                ix
                id
                lang_id
                name
                slug
                sort
                prefix
                territorial_area_1
                territorial_area_2
                territorial_area_3
                zones
                data_lang
            }
        `;

        super.init();
    }
}

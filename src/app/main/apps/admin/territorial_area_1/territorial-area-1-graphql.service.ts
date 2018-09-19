import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class TerritorialArea1GraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetTerritorialAreas1Pagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput] $sqlCountry:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminTerritorialAreas1Pagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            ${this.relationsFields}
        }`;

    queryRelationsObject  = gql`
        query AdminGetRelationsTerritorialArea1 ($sqlCountry:[CoreSQLQueryInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetTerritorialAreas1 ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminTerritorialAreas1 (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminTerritorialArea1 ($sql:[CoreSQLQueryInput] $sqlCountry:[CoreSQLQueryInput]) {
            coreObject: adminTerritorialArea1 (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation AdminAddTerritorialArea1 ($object:AdminTerritorialArea1Input!) {
            adminAddTerritorialArea1 (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateTerritorialArea1 ($object:AdminTerritorialArea1Input!) {
            adminUpdateTerritorialArea1 (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteTerritorialArea1 ($id:String!) {
            adminDeleteTerritorialArea1 (id:$id){
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
            adminCountry: adminCountry (sql:$sqlCountry){
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

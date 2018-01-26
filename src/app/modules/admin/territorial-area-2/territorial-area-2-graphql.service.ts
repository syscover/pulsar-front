import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

@Injectable()
export class TerritorialArea2GraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query AdminGetTerritorialAreas2Pagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminTerritorialAreas2Pagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query AdminGetTerritorialAreas2 ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminTerritorialAreas2 (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetTerritorialArea2 ($sql:[CoreSQLQueryInput]) {
            coreObject: adminTerritorialArea2 (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
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

    init() {
        // model of backoffice relative at this GraphQL service
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

        super.init();
    }
}

import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class TerritorialArea1GraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query AdminGetTerritorialAreas1Pagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminTerritorialAreas1Pagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query AdminGetTerritorialAreas1 ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminTerritorialAreas1 (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetTerritorialArea1 ($sql:[CoreSQLQueryInput]) {
            coreObject: adminTerritorialArea1 (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
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

    init() {
        // model of backoffice relative at this GraphQL service
        this.model = 'Syscover\\Admin\\Models\\TerritorialArea1';
        this.table = 'admin_territorial_area_1';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminTerritorialArea1 {
                ix
                id
                country_id
                name
            }
        `;

        super.init();
    }
}

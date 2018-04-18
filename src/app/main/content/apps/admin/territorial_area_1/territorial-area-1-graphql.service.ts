import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class TerritorialArea1GraphQLService extends GraphQLSchema 
{
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
        query AdminTerritorialArea1 ($sql:[CoreSQLQueryInput]) {
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
        mutation AdminDeleteTerritorialArea1 ($field_id:Int! $id:String! $lang_id:String!) {
            adminDeleteTerritorialArea1 (field_id:$field_id id:$id lang_id:$lang_id){
                ${this.fields}
            }
        }`;

    init() 
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

        super.init();
    }
}

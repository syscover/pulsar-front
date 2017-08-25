import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class TypeGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query CrmGetTypesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: crmTypesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query CrmGetTypes ($sql:[CoreSQLQueryInput]) {
            coreObjects: crmTypes (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CrmGetType ($sql:[CoreSQLQueryInput]) {
            coreObject: crmType (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation CrmAddType ($object:CrmTypeInput!) {
            crmAddType (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CrmUpdateType ($object:CrmTypeInput!) {
            crmUpdateType (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CrmDeleteType ($id:Int!) {
            crmDeleteType (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Crm\\Models\\Type';
        this.table = 'crm_type';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CrmType {
                    id
                    name
                }
        `;

        super.init();
    }
}

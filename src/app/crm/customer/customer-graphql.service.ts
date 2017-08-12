import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class CustomerGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query CrmGetCustomersPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: crmCustomersPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query CrmGetCustomers ($sql:[CoreSQLQueryInput]) {
            coreObjects: crmCustomers (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CrmGetCustomer ($sql:[CoreSQLQueryInput]) {
            coreObject: crmCustomer (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation CrmAddCustomer ($object:CrmCustomerInput!) {
            crmAddCustomer (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CrmUpdateCustomer ($object:CrmCustomerInput!) {
            crmUpdateCustomer (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CrmDeleteCustomer ($id:Int!) {
            crmDeleteCustomer (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Crm\\Models\\Customer';
        this.table = 'crm_group';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CrmCustomer {
                    id
                    name
                }
        `;

        super.init();
    }
}

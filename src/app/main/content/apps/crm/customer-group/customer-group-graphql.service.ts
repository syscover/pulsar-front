import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class CustomerGroupGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query CrmGetCustomerGroupsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: crmCustomerGroupsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query CrmGetCustomerGroups ($sql:[CoreSQLQueryInput]) {
            coreObjects: crmCustomerGroups (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CrmGetCustomerGroup ($sql:[CoreSQLQueryInput]) {
            coreObject: crmCustomerGroup (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation CrmAddCustomerGroup ($object:CrmCustomerGroupInput!) {
            crmAddCustomerGroup (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CrmUpdateCustomerGroup ($object:CrmCustomerGroupInput!) {
            crmUpdateCustomerGroup (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CrmDeleteCustomerGroup ($id:Int!) {
            crmDeleteCustomerGroup (id:$id){
                ${this.fields}
            }
        }`;

    init() 
    {
        this.model = 'Syscover\\Crm\\Models\\CustomerGroup';
        this.table = 'crm_customer_group';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CrmCustomerGroup {
                    id
                    name
                }
        `;

        super.init();
    }
}

import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class CustomerGroupGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query CrmGetCustomerGroupsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: crmCustomerGroupsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query CrmGetCustomerGroups ($sql:[CoreSQLInput]) {
            coreObjects: crmCustomerGroups (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CrmGetCustomerGroup ($sql:[CoreSQLInput]) {
            coreObject: crmCustomerGroup (sql:$sql) {
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation CrmCreateCustomerGroup ($payload:CrmCustomerGroupInput!) {
            crmCreateCustomerGroup (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CrmUpdateCustomerGroup ($payload:CrmCustomerGroupInput!) {
            crmUpdateCustomerGroup (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CrmDeleteCustomerGroup ($id:Int!) {
            crmDeleteCustomerGroup (id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
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

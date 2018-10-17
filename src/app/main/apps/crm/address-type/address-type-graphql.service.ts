import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class AddressTypeGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query CrmGetAddressTypesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: crmAddressTypesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query CrmGetAddressTypes ($sql:[CoreSQLInput]) {
            coreObjects: crmAddressTypes (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CrmGetAddressType ($sql:[CoreSQLInput]) {
            coreObject: crmAddressType (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation CrmCreateAddressType ($payload:CrmAddressTypeInput!) {
            crmCreateAddressType (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CrmUpdateAddressType ($payload:CrmAddressTypeInput!) {
            crmUpdateAddressType (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CrmDeleteAddressType ($id:Int!) {
            crmDeleteAddressType (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Crm\\Models\\AddressType';
        this.table = 'crm_address_type';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CrmAddressType {
                    id
                    name
                }
        `;

        super.init();
    }
}

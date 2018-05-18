import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class AddressTypeGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query CrmGetAddressTypesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: crmAddressTypesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query CrmGetAddressTypes ($sql:[CoreSQLQueryInput]) {
            coreObjects: crmAddressTypes (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CrmGetAddressType ($sql:[CoreSQLQueryInput]) {
            coreObject: crmAddressType (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation CrmAddAddressType ($object:CrmAddressTypeInput!) {
            crmAddAddressType (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CrmUpdateAddressType ($object:CrmAddressTypeInput!) {
            crmUpdateAddressType (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CrmDeleteAddressType ($id:Int!) {
            crmDeleteAddressType (id:$id){
                ${this.fields}
            }
        }`;

    init() 
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

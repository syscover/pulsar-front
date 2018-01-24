import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

@Injectable()
export class CustomerGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query CrmGetCustomersPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: crmCustomersPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query CrmGetRelationsCustomer ($sqlCountry:[CoreSQLQueryInput]){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CrmGetCustomers ($sql:[CoreSQLQueryInput]) {
            coreObjects: crmCustomers (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CrmGetCustomer ($sql:[CoreSQLQueryInput] $sqlAddress:[CoreSQLQueryInput] $sqlCountry:[CoreSQLQueryInput]) {
            coreObject: crmCustomer (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
            crmAddresses (sql:$sqlAddress){
                id
                type_id
                type {
                    id
                    name
                }
                alias
                company
                tin
                name
                surname
                email
                address
                country_id
                territorial_area_1_id
                territorial_area_2_id
                territorial_area_3_id
                zip
                locality
                latitude
                longitude
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
        this.table = 'crm_customer';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CrmCustomer {
                    id
                    group_id
                    group {
                        id
                        name
                    }
                    company
                    tin
                    name
                    surname
                    email
                    user
                    active
                    country_id
                    territorial_area_1_id
                    territorial_area_2_id
                    territorial_area_3_id
                    zip
                    locality
                    address
                    latitude
                    longitude
                }
        `;

        this.relationsFields = `
            crmGroups {
                id
                name
            }
            adminCountries (sql:$sqlCountry) {
                id
                lang_id
                name
                territorial_area_1
                territorial_area_2
                territorial_area_3
            }
        `;

        super.init();
    }
}

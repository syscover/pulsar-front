import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class AddressGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query CrmGetAddressesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: crmAddressesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query CrmGetRelationsAddress ($sqlCountry:[CoreSQLQueryInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CrmGetAddresses ($sql:[CoreSQLQueryInput]) {
            coreObjects: crmAddresses (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query CrmGetAddress ($sql:[CoreSQLQueryInput] $sqlCountry:[CoreSQLQueryInput]) {
            coreObject: crmAddress (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation CrmAddAddress ($object:CrmAddressInput!) {
            crmAddAddress (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CrmUpdateAddress ($object:CrmAddressInput!) {
            crmUpdateAddress (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CrmDeleteAddress ($id:Int!) {
            crmDeleteAddress (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Crm\\Models\\Address';
        this.table = 'crm_address';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CrmAddress {
                    id
                    type_id
                    type {
                        id
                        name
                    }
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
                    cp
                    locality
                    latitude
                    longitude
                }
        `;

        this.relationsFields = `
            crmTypes {
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

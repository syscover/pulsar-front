import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class GroupCustomerClassTaxGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query MarketGetGroupCustomerClassTaxesPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketGroupCustomerClassTaxesPagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query MarketGetGroupCustomerClassTaxes ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketGroupCustomerClassTaxes (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetGroupCustomerClassTax ($sql:[CoreSQLQueryInput]) {
            coreObject: marketGroupCustomerClassTax (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation MarketAddGroupCustomerClassTax ($object:MarketGroupCustomerClassTaxInput!) {
            marketAddGroupCustomerClassTax (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateGroupCustomerClassTax ($object:MarketGroupCustomerClassTaxInput!) {
            marketUpdateGroupCustomerClassTax (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteGroupCustomerClassTax ($id:String! $lang:String!) {
            marketDeleteGroupCustomerClassTax (id:$id lang:$lang){
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Market\\Models\\GroupCustomerClassTax';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketGroupCustomerClassTax {
                group_id
                customer_class_tax_id 
            }
        `;

        super.init();
    }
}

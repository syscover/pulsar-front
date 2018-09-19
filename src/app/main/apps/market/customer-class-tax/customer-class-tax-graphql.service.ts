import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class CustomerClassTaxGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query MarketGetCustomerClassTaxesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketCustomerClassTaxesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query MarketGetCustomerClassTaxes ($sql:[CoreSQLInput]) {
            coreObjects: marketCustomerClassTaxes (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetCustomerClassTax ($sql:[CoreSQLInput]) {
            coreObject: marketCustomerClassTax (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation MarketAddCustomerClassTax ($object:MarketCustomerClassTaxInput!) {
            marketAddCustomerClassTax (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateCustomerClassTax ($object:MarketCustomerClassTaxInput!) {
            marketUpdateCustomerClassTax (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteCustomerClassTax ($id:Int!) {
            marketDeleteCustomerClassTax (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Market\\Models\\CustomerClassTax';
        this.table = 'market_customer_class_tax';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketCustomerClassTax {
                id
                name 
            }
        `;

        super.init();
    }
}

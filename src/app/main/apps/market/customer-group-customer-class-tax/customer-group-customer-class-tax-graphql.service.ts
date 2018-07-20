import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class CustomerGroupCustomerClassTaxGraphQLService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query MarketGetCustomerGroupsCustomerClassTaxesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketCustomerGroupsCustomerClassTaxesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject  = gql`
        query MarketGetRelationsArticle {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetCustomerGroupsCustomerClassTaxes ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketCustomerGroupsCustomerClassTaxes (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query MarketGetCustomerGroupCustomerClassTax ($sql:[CoreSQLQueryInput]) {
            coreObject: marketCustomerGroupCustomerClassTax (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation MarketAddCustomerGroupCustomerClassTax ($object:MarketCustomerGroupCustomerClassTaxInput!) {
            marketAddCustomerGroupCustomerClassTax (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateCustomerGroupCustomerClassTax ($customer_group_id:Int! $customer_class_tax_id:Int! $object:MarketCustomerGroupCustomerClassTaxInput!) {
            marketUpdateCustomerGroupCustomerClassTax (customer_group_id:$customer_group_id customer_class_tax_id:$customer_class_tax_id object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteCustomerGroupCustomerClassTax ($customer_group_id:Int! $customer_class_tax_id:Int!) {
            marketDeleteCustomerGroupCustomerClassTax (customer_group_id:$customer_group_id customer_class_tax_id:$customer_class_tax_id){
                ${this.fields}
            }
        }`;

    init() 
    {
        this.model = 'Syscover\\Market\\Models\\CustomerGroupCustomerClassTax';
        this.table = 'market_customer_group_customer_class_tax';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketCustomerGroupCustomerClassTax {
                customer_group_id
                customer_class_tax_id 
            }
        `;

        this.relationsFields = `
            crmCustomerGroups {
                id
                name
            }
            marketCustomerClassTaxes {
                id
                name
            }
        `;

        super.init();
    }
}

import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class TaxRuleGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query MarketGetTaxRulesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketTaxRulesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query MarketGetRelationsTaxRule {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetTaxRules ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketTaxRules (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetTaxRule ($sql:[CoreSQLQueryInput]) {
            coreObject: marketTaxRule (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation MarketAddTaxRule ($object:MarketTaxRuleInput!) {
            marketAddTaxRule (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateTaxRule ($object:MarketTaxRuleInput!) {
            marketUpdateTaxRule (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteTaxRule ($id:Int!) {
            marketDeleteTaxRule (id:$id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Market\\Models\\TaxRule';
        this.table = 'market_tax_rule';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketTaxRule {
                id
                name
                translation
                priority
                sort
                tax_rate_zones {
                    id
                    name
                }
                customer_class_taxes {
                    id
                    name
                }
                product_class_taxes {
                    id
                    name
                }
            }
        `;

        this.relationsFields = `
            marketTaxRateZones {
                id
                name
            }
            marketCustomerClassTaxes {
                id
                name
            }
            marketProductClassTaxes {
                id
                name
            }
        `;

        super.init();
    }
}

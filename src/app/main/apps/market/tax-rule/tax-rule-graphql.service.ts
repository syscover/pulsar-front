import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class TaxRuleGraphQLService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query MarketGetTaxRulesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketTaxRulesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query MarketGetRelationsTaxRule {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetTaxRules ($sql:[CoreSQLInput]) {
            coreObjects: marketTaxRules (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetTaxRule ($sql:[CoreSQLInput]) {
            coreObject: marketTaxRule (sql:$sql) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation MarketCreateTaxRule ($payload:MarketTaxRuleInput!) {
            marketCreateTaxRule (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateTaxRule ($payload:MarketTaxRuleInput!) {
            marketUpdateTaxRule (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteTaxRule ($id:Int!) {
            marketDeleteTaxRule (id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
    {
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

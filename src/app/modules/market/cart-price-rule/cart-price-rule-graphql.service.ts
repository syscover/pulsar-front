import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

@Injectable()
export class CartPriceRuleGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query MarketGetCartPriceRulesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketCartPriceRulesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject  = gql`
        query MarketGetRelationsCartPriceRule ($configDiscountTypes:CoreConfigInput!) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetCartPriceRules ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketCartPriceRules (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetCartPriceRule ($sql:[CoreSQLQueryInput] $configDiscountTypes:CoreConfigInput!) {
            coreObject: marketCartPriceRule (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation MarketAddCartPriceRule ($object:MarketCartPriceRuleInput!) {
            marketAddCartPriceRule (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateCartPriceRule ($object:MarketCartPriceRuleInput!) {
            marketUpdateCartPriceRule (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteCartPriceRule ($id:Int! $lang_id:String!) {
            marketDeleteCartPriceRule (id:$id lang_id:$lang_id){
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Market\\Models\\CartPriceRule';
        this.table = 'market_cart_price_rule';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketCartPriceRule {
                id
                names
                descriptions
                active
                group_ids
                customer_ids
                combinable
                priority
                has_coupon
                coupon_code
                customer_uses
                coupon_uses
                total_uses
                enable_from
                enable_to
                condition_rules
                discount_type_id
                discount_fixed_amount
                discount_percentage
                maximum_discount_amount
                apply_shipping_amount
                free_shipping
                product_rules
                data_lang
            }
        `;

        this.relationsFields = `
            crmGroups {
                id
                name
            }
            marketDiscountTypes: coreConfig (config:$configDiscountTypes) {
                ... on CoreConfigOption {
                    id
                    name
                }
            }
        `;

        super.init();
    }
}

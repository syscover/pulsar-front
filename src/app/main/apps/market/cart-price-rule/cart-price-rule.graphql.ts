import gql from 'graphql-tag';
import { graphQL as crmCustomerGroupGraphQL } from '../../crm/customer-group/customer-group.graphql';

const fields = `
    id
    names
    descriptions
    active
    customer_group_ids
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
`;

const relationsFields = `
    crmCustomerGroups {
        ${crmCustomerGroupGraphQL.fields}
    }
    marketDiscountTypes: coreConfig (config:$configDiscountTypes)
`;

export const graphQL = {
    model: 'Syscover\\Market\\Models\\CartPriceRule',
    table: 'market_cart_price_rule',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetCartPriceRulesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketCartPriceRulesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query MarketGetRelationsCartPriceRule ($configDiscountTypes:CoreConfigInput!) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetCartPriceRules ($sql:[CoreSQLInput]) {
            coreObjects: marketCartPriceRules (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetCartPriceRule ($sql:[CoreSQLInput] $configDiscountTypes:CoreConfigInput!) {
            coreObject: marketCartPriceRule (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateCartPriceRule ($payload:MarketCartPriceRuleInput!) {
            marketCreateCartPriceRule (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateCartPriceRule ($payload:MarketCartPriceRuleInput!) {
            marketUpdateCartPriceRule (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteCartPriceRule ($id:Int! $lang_id:String!) {
            marketDeleteCartPriceRule (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

import { graphQL as marketCategoryGraphQL } from '../../../apps/market/category/category.graphql';

export const graphQL = {

    fields: `
        active
        categories {
            ${marketCategoryGraphQL.fields}
        }
        class_id
        cost
        cost_per_sale
        ends_at
        enable_from
        enable_to
        fixed_cost
        lang_id
        limited_capacity
        name
        parent_id
        price_type_id
        product_class_tax_id
        sections {
            ix
            id
            name
        }
        sku
        slug
        sort
        starts_at
        subtotal
        weight
    `,

    relationsFields: `
        marketCategories (sql:$sqlMarketableCategory) {
            ${marketCategoryGraphQL.fields}
        }
        marketPriceTypes: coreConfig (config:$configMarketablePriceTypes)
        marketProductClassTaxes {
            id
            name
        }
        marketProducts (sql:$sqlMarketableProduct) {
            ix
            id
            lang_id
            name
            sku
        }
        marketProductClasses: coreConfig (config:$configMarketableProductClasses)
        marketSections (sql:$sqlMarketableSection) {
            ix
            id
            lang_id
            name
            slug
        }
    `,

    paramenters: `
        $configMarketablePriceTypes:CoreConfigInput!
        $configMarketableProductClasses:CoreConfigInput!
        $sqlMarketableCategory:[CoreSQLInput]
        $sqlMarketableProduct:[CoreSQLInput]
        $sqlMarketableSection:[CoreSQLInput]
    `
};

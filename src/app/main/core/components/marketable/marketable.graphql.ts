export const graphQL = {

    fields: `
        active
        categories {
            id
            ix
            lang_id
            name
        }
        cost
        ends_at
        ends_sale
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
        starts_sale
        subtotal
        type_id
        weight
    `,

    relationsFields: `
        marketCategories (sql:$sqlCategory) {
            ix
            id
            lang_id
            name
        }
        marketPriceTypes: coreConfig (config:$configPriceTypes)
        marketProductClassTaxes {
            id
            name
        }
        marketProducts (sql:$sqlProduct) {
            ix
            id
            lang_id
            name
            sku
        }
        marketProductTypes: coreConfig (config:$configProductTypes)
        marketSections (sql:$sqlSection) {
            ix
            id
            lang_id
            name
            slug
        }
    `
};

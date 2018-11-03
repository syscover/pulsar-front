export const graphQL = {

    fields: `
        active
        lang_id
        name
        parent_id
        price_type_id
        product_class_tax_id
        products {
            categories {
                id
                ix
                lang_id
                name
            }
            sections {
                ix
                id
                name
            }
        }
        sku
        slug
        sort
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
        marketProducts (sql:$sqlProduct) {
            ix
            id
            lang_id
            name
            sku
        }
        marketSections (sql:$sqlSection) {
            ix
            id
            lang_id
            name
            slug
        }
        marketProductClassTaxes {
            id
            name
        }
        marketProductTypes: coreConfig (config:$configProductTypes)
        marketPriceTypes: coreConfig (config:$configPriceTypes)
    `
};

export const graphQL = {
    fields: `
        ... on MarketProduct {
                sku
                categories {
                    ix
                    id
                    lang_id
                    name
                }
                price
            }
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

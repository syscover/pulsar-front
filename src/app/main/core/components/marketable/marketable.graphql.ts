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
    `
};

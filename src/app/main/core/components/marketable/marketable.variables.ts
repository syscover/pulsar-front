export const graphQL = {
    relationsFields: `
        marketCategories (sql:$sqlCategory) {
            ix
            id
            lang_id
            name
        }
    `
};

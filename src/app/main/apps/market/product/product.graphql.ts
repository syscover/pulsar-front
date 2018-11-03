import gql from 'graphql-tag';

const fields = `
    ... on MarketProduct {
        attachments {
            alt
            base_path
            extension
            family_id
            file_name
            height
            id
            ix
            lang_id
            library_file_name
            library_id
            mime
            object_id
            object_type
            sort
            title
            url
            size
            width
            attachment_library {
                base_path
                extension
                file_name
                height
                id
                mime
                name
                size
                url
                width
            }
        }
        data
        data_lang
        description
        field_group_id
        id
        ix
        
        active
        categories {
            id
            ix
            lang_id
            name
        }
        lang_id
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
        subtotal
        type_id
        weight
    }
`;

const relationsFields = `
    marketCategories (sql:$sqlCategory) {
        ix
        id
        lang_id
        name
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
    marketProducts (sql:$sqlProduct) {
        ix
        id
        lang_id
        name
        sku
    }
    adminFieldGroups (sql:$sqlFieldGroup) {
        id
        name
    }
    adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
        id
        name
        resource_id
        width
        height
        sizes
        quality
        format
    }
    marketProductTypes: coreConfig (config:$configProductTypes)
    marketPriceTypes: coreConfig (config:$configPriceTypes)
    marketWarehouses {
        id
        name
    }
`;

export const graphQL = {

    model: 'Syscover\\Market\\Models\\Product',
    modelLang: 'Syscover\\Market\\Models\\ProductLang',
    table: 'market_product',
    tableLang: 'market_product_lang',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query MarketGetProductsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: marketProductsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query MarketGetRelationsProduct (
            $sqlProduct:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $configProductTypes:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlFieldGroup:[CoreSQLInput]
        ) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query MarketGetProducts ($sql:[CoreSQLInput]) {
            coreObjects: marketProducts (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query MarketGetProduct (
            $sql:[CoreSQLInput]
            $sqlProduct:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlSection:[CoreSQLInput]
            $configProductTypes:CoreConfigInput!
            $configPriceTypes:CoreConfigInput!
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlFieldGroup:[CoreSQLInput]
            $sqlStock:[CoreSQLInput]
        ) {
            coreObject: marketProduct (sql:$sql){
                ${fields}
            }
            ${relationsFields}
            marketStocks (sql:$sqlStock) {
                warehouse_id
                product_id
                stock
                minimum_stock
            }
        }`,

    mutationCreateObject: gql`
        mutation MarketCreateProduct ($payload:MarketProductInput!) {
            marketCreateProduct (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation MarketUpdateProduct ($payload:MarketProductInput!) {
            marketUpdateProduct (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation MarketDeleteProduct ($id:Int! $lang_id:String!) {
            marketDeleteProduct (id:$id lang_id:$lang_id){
                ${fields}
            }
        }`
};

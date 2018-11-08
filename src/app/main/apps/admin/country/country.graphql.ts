import gql from 'graphql-tag';

const fields = `
    ix
    id
    lang_id
    name
    slug
    sort
    prefix
    territorial_area_1
    territorial_area_2
    territorial_area_3
    zones
    data_lang
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Country',
    table: 'admin_country',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetCountriesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: adminCountriesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query AdminGetCountries ($sql:[CoreSQLInput]) {
            coreObjects: adminCountries (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetCountry ($sql:[CoreSQLInput]) {
            coreObject: adminCountry (sql:$sql){
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateCountry ($payload:AdminCountryInput!) {
            adminCreateCountry (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateCountry ($payload:AdminCountryInput!) {
            adminUpdateCountry (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteCountry ($id:String! $lang_id:String!) {
            adminDeleteCountry (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

import gql from 'graphql-tag';

const fields = `
    ix
    id
    name 
    icon 
    sort 
    active
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Lang',
    table: 'admin_lang',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetLangsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminLangsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query AdminGetLangs ($sql:[CoreSQLInput]) {
            coreObjects: adminLangs (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetLang ($sql:[CoreSQLInput]) {
            coreObject: adminLang (sql:$sql){
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateLang ($payload:AdminLangInput!) {
            adminCreateLang (payload:$payload){
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateLang ($payload:AdminLangInput!) {
            adminUpdateLang (payload:$payload){
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteLang ($id:String!) {
            adminDeleteLang (id:$id){
                ${fields}
            }
        }`
};

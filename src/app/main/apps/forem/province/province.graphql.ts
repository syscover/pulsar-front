import gql from 'graphql-tag';

const fields = `
    id
    code
    name
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Province',
    table: 'forem_profile',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetProvincesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremProvincesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query ForemGetProvinces ($sql:[CoreSQLInput]) {
            coreObjects: foremProvinces (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ForemGetProvince ($sql:[CoreSQLInput]) {
            coreObject: foremProvince (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateProvince ($payload:ForemProvinceInput!) {
            foremCreateProvince (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateProvince ($payload:ForemProvinceInput!) {
            foremUpdateProvince (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteProvince ($id:Int!) {
            foremDeleteProvince (id:$id) {
                ${fields}
            }
        }`
};

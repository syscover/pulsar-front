import gql from 'graphql-tag';

const fields = `
    ix
    id
    lang_id
    field_id
    counter
    sort
    featured
    name
    data_lang
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\FieldValue',
    table: 'admin_field_value',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetFieldValuesPagination ($sql:[CoreSQLInput] $filters:[CoreSQLInput]) {
            coreObjectsPagination: adminFieldValuesPagination (sql:$sql filters:$filters) {
                total
                objects (sql:$sql filters:$filters)
                filtered
            }
        }`,

    queryObjects: gql`
        query AdminGetFieldValues ($sql:[CoreSQLInput]) {
            coreObjects: adminFieldValues (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminFieldValue ($sql:[CoreSQLInput]) {
            coreObject: adminFieldValue (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateFieldValue ($payload:AdminFieldValueInput!) {
            adminCreateFieldValue (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateFieldValue ($payload:AdminFieldValueInput!) {
            adminUpdateFieldValue (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteFieldValue ($id:String! $lang_id:String! $field_id:Int!) {
            adminDeleteFieldValue (id:$id lang_id:$lang_id field_id:$field_id) {
                ${fields}
            }
        }`
};

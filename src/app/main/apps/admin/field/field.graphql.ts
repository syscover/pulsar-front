import gql from 'graphql-tag';
import { graphQL as adminFieldValueGraphQL } from '../field-value/field-value.graphql';
import { graphQL as adminFieldGroupGraphQL } from '../field-group/field-group.graphql';

const fields = `
    id
    field_group_id
    field_group_name
    name
    labels {
        id
        value 
    }
    field_type_id
    field_type_name
    data_type_id
    data_type_name
    required
    sort
    max_length
    pattern
    label_class
    component_class
    values {
        ${adminFieldValueGraphQL.fields}
    }
    data_lang
`;

const relationsFields = `
    adminFieldGroups (sql:$sqlFieldGroup) {
        ${adminFieldGroupGraphQL.fields}
    }
    coreConfigFieldTypes:coreConfig (config:$configFieldTypes)
    coreConfigDataTypes:coreConfig (config:$configDataTypes)
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Field',
    table: 'admin_field',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetFieldsPagination ($sql:[CoreSQLInput] $configFieldTypes:CoreConfigInput!) {
            coreObjectsPagination: adminFieldsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
            adminConfigFieldTypes:coreConfig (config:$configFieldTypes)
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsField ($sqlFieldGroup:[CoreSQLInput] $configFieldTypes:CoreConfigInput! $configDataTypes:CoreConfigInput!) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetFields ($sql:[CoreSQLInput] $sqlFieldGroup:[CoreSQLInput] $configFieldTypes:CoreConfigInput! $configDataTypes:CoreConfigInput!) {
            coreObjects: adminFields (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query AdminGetField ($sql:[CoreSQLInput] $sqlFieldGroup:[CoreSQLInput] $configFieldTypes:CoreConfigInput! $configDataTypes:CoreConfigInput!) {
            coreObject: adminField (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateField ($payload:AdminFieldInput!) {
            adminCreateField (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateField ($payload:AdminFieldInput!) {
            adminUpdateField (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteField ($id:Int! $lang_id:String!) {
            adminDeleteField (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

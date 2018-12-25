import gql from 'graphql-tag';
import { graphQL as adminProfileGraphQL } from './../profile/profile.graphql';
import { graphQL as adminLangGraphQL } from './../lang/lang.graphql';

const fields = `
    id 
    name
    surname
    lang_id
    email
    profile_id
    active
    user
    profile {
        ${adminProfileGraphQL.fields}
    }
`;

const relationsFields = `
    adminProfiles {
        ${adminProfileGraphQL.fields}
    }
    adminLangs {
        ${adminLangGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\User',
    table: 'admin_user',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetUsersPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminUsersPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query AdminGetRelationsUser {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetUsers ($sql:[CoreSQLInput]) {
            coreObjects: adminUsers (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query AdminGetUser ($sql:[CoreSQLInput]) {
            coreObject: adminUser (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateUser ($payload:AdminUserInput!) {
            adminCreateUser (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateUser ($payload:AdminUserInput!) {
            adminUpdateUser (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteUser ($id:Int!) {
            adminDeleteUser (id:$id) {
                ${fields}
            }
        }`
};

import gql from 'graphql-tag';
import {graphQL as marketableGraphQL} from '@horus/components/marketable/marketable.graphql';

const fields = `
    ix
    id
    name
`;

const relationsFields = `
    adminFieldGroups (sql:$sqlFieldGroup) {
        id
        name
    }
`;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Action',
    table: 'admin_action',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetActionsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminActionsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query MarketGetRelationsProduct (
            $sqlFieldGroup:[CoreSQLInput]
        ) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query AdminGetActions ($sql:[CoreSQLInput]) {
            coreObjects: adminActions (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetAction ($sql:[CoreSQLInput]) {
            coreObject: adminAction (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation AdminCreateAction ($payload:AdminActionInput!) {
            adminCreateAction (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdateAction ($payload:AdminActionInput!) {
            adminUpdateAction (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeleteAction ($id:String!) {
            adminDeleteAction (id:$id) {
                ${fields}
            }
        }`
};

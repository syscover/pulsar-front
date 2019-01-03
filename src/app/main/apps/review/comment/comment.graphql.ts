import gql from 'graphql-tag';
import { graphQL as reviewQuestion } from '../question/question.graphql';
import { graphQL as reviewResponse } from '../response/response.graphql';

const fields = `
    id
    review_id
    review {
        id
        object_name
        poll_id
        poll {
            id
            name
            questions {
                ${reviewQuestion.fields}
            }
        }
        responses {
            ${reviewResponse.fields}
        }
        comments {
            id
            date
            owner_type_id
            name
            email
            comment
        }
    }
    date
    owner_type_id
    name
    email
    comment
    validated
`;

const relationsFields = ``;

export const graphQL = {

    model: 'Syscover\\Review\\Models\\Comment',
    table: 'review_comment',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ReviewGetCommentsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: reviewCommentsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query ReviewGetComments ($sql:[CoreSQLInput]) {
            coreObjects: reviewComments (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ReviewGetComment ($sql:[CoreSQLInput]) {
            coreObject: reviewComment (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation ReviewCreateComment ($payload:ReviewCommentInput!) {
            reviewCreateComment (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ReviewActionComment ($payload:ReviewCommentInput! $action_id:Int!) {
            reviewActionComment (payload:$payload action_id:$action_id) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ReviewDeleteComment ($id:Int!) {
            reviewDeleteComment (id:$id) {
                ${fields}
            }
        }`
};

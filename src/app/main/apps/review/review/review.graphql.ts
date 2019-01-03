import gql from 'graphql-tag';
import { graphQL as reviewPoll } from '../poll/poll.graphql';
import { graphQL as reviewQuestion } from '../question/question.graphql';
import { graphQL as reviewResponse } from '../response/response.graphql';

const fields = `
    id
    date
    poll_id
    poll {
        id
        name
        questions {
            ${reviewQuestion.fields}
        }
    }
    object_id
    object_type
    object_name
    object_email
    customer_id
    customer_name
    customer_email
    customer_verified
    email_subject
    review_url
    review_completed_url
    validated
    completed
    average
    mailing
    sent
    expiration
    responses {
        ${reviewResponse.fields}
    }
`;

const relationsFields = `
    reviewPolls {
        ${reviewPoll.fields}
    }
`;

export const graphQL = {

    model: 'Syscover\\Review\\Models\\Review',
    table: 'review_review',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ReviewGetReviewsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: reviewReviewsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query ReviewGetRelationsReview {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ReviewGetReviews ($sql:[CoreSQLInput]) {
            coreObjects: reviewReviews (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ReviewGetReview ($sql:[CoreSQLInput]) {
            coreObject: reviewReview (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation ReviewCreateReview ($payload:ReviewReviewInput!) {
            reviewCreateReview (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ReviewActionReview ($payload:ReviewReviewInput! $action_id:Int!) {
            reviewActionReview (payload:$payload action_id:$action_id) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ReviewDeleteReview ($id:Int!) {
            reviewDeleteReview (id:$id) {
                ${fields}
            }
        }`
};

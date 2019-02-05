import gql from 'graphql-tag';

const fields = `
    id
    poll_id   
    question_id
    object_type
    object_id
    reviews
    total
    average
    fake_average
`;

export const graphQL = {

    model: 'Syscover\\Review\\Models\\ObjectQuestionAverage',
    table: 'review_object_question_average',
    fields
};

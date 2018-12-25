import gql from 'graphql-tag';

const fields = `
    id
    review_id
    question_id
    questions
    score
    text
`;

export const graphQL = {

    model: 'Syscover\\Review\\Models\\Response',
    table: 'review_response',
    fields
};

import gql from 'graphql-tag';

const fields = `
    id
    poll_id   
    question_id
    question {
        ix
        id
        lang_id
        poll_id
        type_id
        name
        description
        sort
        high_score
        data_lang
    }
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

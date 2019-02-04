import gql from 'graphql-tag';
import { graphQL as reviewQuestion } from '../question/question.graphql';

const fields = `
    id
    review_id
    question_id
    questions {
        ${reviewQuestion.fields}
    }
    score
    text
`;

export const graphQL = {

    model: 'Syscover\\Review\\Models\\Response',
    table: 'review_response',
    fields
};

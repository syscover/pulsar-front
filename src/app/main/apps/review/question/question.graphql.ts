import gql from 'graphql-tag';
import { graphQL as reviewQuestionAverage } from '../question-average/question-average.graphql';
import { graphQL as reviewPoll } from '../poll/poll.graphql';

const fields = `
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
    average {
        ${reviewQuestionAverage.fields}
    }
`;

const relationsFields = `
    reviewPolls {
        ${reviewPoll.fields}
    }
    reviewQuestionTypes: coreConfig (config:$configQuestionTypes)
`;

export const graphQL = {

    model: 'Syscover\\Review\\Models\\Question',
    table: 'review_question',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ReviewGetQuestionsPagination ($sql:[CoreSQLInput] $filters:[CoreSQLInput]) {
            coreObjectsPagination: reviewQuestionsPagination (sql:$sql filters:$filters) {
                total
                objects (sql:$sql filters:$filters)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query ReviewGetRelationsQuestion ($configQuestionTypes:CoreConfigInput!) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ReviewGetQuestions ($sql:[CoreSQLInput]) {
            coreObjects: reviewQuestions (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ReviewGetQuestion (
            $sql:[CoreSQLInput]
            $configQuestionTypes:CoreConfigInput!
        ) {
            coreObject: reviewQuestion (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation ReviewCreateQuestion ($payload:ReviewQuestionInput!) {
            reviewCreateQuestion (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ReviewUpdateQuestion ($payload:ReviewQuestionInput!) {
            reviewUpdateQuestion (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ReviewDeleteQuestion ($id:Int! $lang_id:Int!) {
            reviewDeleteQuestion (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

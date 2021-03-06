import gql from 'graphql-tag';
import { graphQL as reviewPoll } from '../poll/poll.graphql';
import { graphQL as objectQuestionAverage } from '../object-question-average/object-question-average.graphql';

const fields = `
    id
    poll_id
    poll {
        ${reviewPoll.fields}
    }
    object_id
    object_type
    object_name
    reviews
    total
    average
    fake_average
    question_averages {
        ${objectQuestionAverage.fields}
    }
`;

const relationsFields = `
    reviewPolls {
        ${reviewPoll.fields}
    }
`;

export const graphQL = {

    model: 'Syscover\\Review\\Models\\ObjectAverage',
    table: 'review_object_average',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ReviewGetObjectAveragesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: reviewObjectAveragesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject : gql`
        query ReviewGetObjectAveragesReview {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ReviewGetObjectAverages ($sql:[CoreSQLInput]) {
            coreObjects: reviewObjectAverages (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ReviewGetObjectAverage ($sql:[CoreSQLInput]) {
            coreObject: reviewObjectAverage (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation ReviewCreateObjectAverage ($payload:ReviewObjectAverageInput!) {
            reviewCreateObjectAverage (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ReviewUpdateObjectAverage ($payload:ReviewObjectAverageInput!) {
            reviewUpdateObjectAverage (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ReviewDeleteObjectAverage ($id:Int!) {
            reviewDeleteObjectAverage (id:$id) {
                ${fields}
            }
        }`
};

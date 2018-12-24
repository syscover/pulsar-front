import gql from 'graphql-tag';

const fields = `
    id
    name
    send_notification
    validate
    default_high_score
    mailing_days
    expiration_days
    review_route
    comment_route
    review_email_template
    comment_email_template
`;

const relationsFields = ``;

export const graphQL = {

    model: 'Syscover\\Review\\Models\\Poll',
    table: 'review_poll',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ReviewGetPollsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: reviewPollsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query ReviewGetPolls ($sql:[CoreSQLInput]) {
            coreObjects: reviewPolls (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ReviewGetPoll ($sql:[CoreSQLInput]) {
            coreObject: reviewPoll (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation ReviewCreatePoll ($payload:ReviewPollInput!) {
            reviewCreatePoll (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ReviewUpdatePoll ($payload:ReviewPollInput!) {
            reviewUpdatePoll (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ReviewDeletePoll ($id:Int!) {
            reviewDeletePoll (id:$id) {
                ${fields}
            }
        }`
};

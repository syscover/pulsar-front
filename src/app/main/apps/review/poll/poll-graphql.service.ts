import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class PollGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query ReviewGetPollsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: reviewPollsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query ReviewGetPolls ($sql:[CoreSQLInput]) {
            coreObjects: reviewPolls (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetPoll ($sql:[CoreSQLInput]) {
            coreObject: reviewPoll (sql:$sql) {
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation ReviewCreatePoll ($payload:ReviewPollInput!) {
            reviewCreatePoll (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewUpdatePoll ($payload:ReviewPollInput!) {
            reviewUpdatePoll (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeletePoll ($id:Int!) {
            reviewDeletePoll (id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Review\\Models\\Poll';
        this.table = 'review_poll';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewPoll {
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
            }
        `;

        super.init();
    }
}

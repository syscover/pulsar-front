import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';


export class PollGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query ReviewGetPollsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: reviewPollsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query ReviewGetPolls ($sql:[CoreSQLQueryInput]) {
            coreObjects: reviewPolls (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetPoll ($sql:[CoreSQLQueryInput]) {
            coreObject: reviewPoll (sql:$sql) {
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation ReviewAddPoll ($object:ReviewPollInput!) {
            reviewAddPoll (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewUpdatePoll ($object:ReviewPollInput!) {
            reviewUpdatePoll (object:$object) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeletePoll ($id:Int!) {
            reviewDeletePoll (id:$id) {
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Review\\Models\\Poll';
        this.table = 'review_poll';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewPoll {
                id
                name
                email_template
                send_notification
                poll_route
                validate
                default_high_score
                mailing_days
                expiration_days
            }
        `;

        super.init();
    }
}

import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

export class ReviewGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query ReviewGetReviewsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: reviewReviewsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql) {
                    ${this.fields}
                }
            }
        }`;

    queryRelationsObject = gql`
        query ReviewGetRelationsReview {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query ReviewGetReviews ($sql:[CoreSQLQueryInput]) {
            coreObjects: reviewReviews (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetReview ($sql:[CoreSQLQueryInput]) {
            coreObject: reviewReview (sql:$sql) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation ReviewAddReview ($object:ReviewReviewInput!) {
            reviewAddReview (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewActionReview ($object:ReviewReviewInput! $action_id:Int!) {
            reviewActionReview (object:$object action_id:$action_id) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeleteReview ($id:Int!) {
            reviewDeleteReview (id:$id) {
                ${this.fields}
            }
        }`;

    init() 
    {
        this.model = 'Syscover\\Review\\Models\\Review';
        this.table = 'review_review';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewReview {
                id
                date
                poll_id
                poll {
                    id
                    name
                    questions {
                        ix
                        id
                        lang_id
                        type_id
                        name
                        description
                        sort
                        high_score
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
                poll_url
                validated
                completed
                average
                mailing
                sent
                expiration
                responses {
                    id
                    review_id
                    question_id
                    score
                    text
                }
            }
        `;

        this.relationsFields = `
            reviewPolls {
                id
                name
            }
        `;

        super.init();
    }
}

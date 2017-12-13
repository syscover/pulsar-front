import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';


export class ReviewGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query ReviewGetReviewsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: reviewReviewsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
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
        mutation ReviewActionReview ($id:Int! $action_id:Int!) {
            reviewActionReview (id:$id action_id:$action_id) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeleteReview ($id:Int!) {
            reviewDeleteReview (id:$id) {
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Review\\Models\\Review';
        this.table = 'review_review';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewReview {
                id
                date
                poll_id
                object_id
                object_type
                object_name
                customer_id
                customer_name
                customer_email
                customer_verified
                email_subject
                validated
                completed
                average
                mailing
                expiration
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

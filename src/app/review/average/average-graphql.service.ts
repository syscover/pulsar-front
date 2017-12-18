import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';


export class AverageGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query ReviewGetAveragesPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: reviewAveragesPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query ReviewGetAveragesReview {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query ReviewGetAverages ($sql:[CoreSQLQueryInput]) {
            coreObjects: reviewAverages (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetAverage ($sql:[CoreSQLQueryInput]) {
            coreObject: reviewAverage (sql:$sql) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation ReviewAddAverage ($object:ReviewAverageInput!) {
            reviewAddAverage (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewUpdateAverage ($object:ReviewAverageInput!) {
            reviewUpdateAverage (object:$object) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeleteAverage ($id:Int!) {
            reviewDeleteAverage (id:$id) {
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Review\\Models\\Average';
        this.table = 'review_average';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewAverage {
                id
                poll_id
                poll {
                    id
                    name
                    email_template
                    send_notification
                    default_high_score
                    mailing_days
                    expiration_days
                }
                object_id
                object_type
                object_name
                reviews
                total
                average
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

import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class ObjectAverageGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query ReviewGetObjectAveragesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: reviewObjectAveragesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query ReviewGetObjectAveragesReview {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query ReviewGetObjectAverages ($sql:[CoreSQLInput]) {
            coreObjects: reviewObjectAverages (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetObjectAverage ($sql:[CoreSQLInput]) {
            coreObject: reviewObjectAverage (sql:$sql) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation ReviewCreateObjectAverage ($object:ReviewAverageInput!) {
            reviewCreateObjectAverage (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewUpdateObjectAverage ($object:ReviewAverageInput!) {
            reviewUpdateObjectAverage (object:$object) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeleteObjectAverage ($id:Int!) {
            reviewDeleteObjectAverage (id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Review\\Models\\ObjectAverage';
        this.table = 'review_object_average';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewObjectAverage {
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

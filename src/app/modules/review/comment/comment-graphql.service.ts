import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

export class CommentGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query ReviewGetCommentsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: reviewCommentsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    /* queryRelationsObject = gql`
        query ReviewGetRelationsComment {
            ${this.relationsFields}
        }`; */

    queryObjects = gql`
        query ReviewGetComments ($sql:[CoreSQLQueryInput]) {
            coreObjects: reviewComments (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetComment ($sql:[CoreSQLQueryInput]) {
            coreObject: reviewComment (sql:$sql) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation ReviewAddComment ($object:ReviewCommentInput!) {
            reviewAddComment (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewActionComment ($object:ReviewCommentInput! $action_id:Int!) {
            reviewActionComment (object:$object action_id:$action_id) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeleteComment ($id:Int!) {
            reviewDeleteComment (id:$id) {
                ${this.fields}
            }
        }`;

    init() {
        this.model = 'Syscover\\Review\\Models\\Comment';
        this.table = 'review_comment';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewComment {
                id
                review_id
                date
                owner_id
                name
                email
                comment
                validated
            }
        `;

        /* this.relationsFields = `
            reviewPolls {
                id
                name
            }
        `; */

        super.init();
    }
}

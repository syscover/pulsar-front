import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

export class CommentGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query ReviewGetCommentsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: reviewCommentsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

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

    init() 
    {
        this.model = 'Syscover\\Review\\Models\\Comment';
        this.table = 'review_comment';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewComment {
                id
                review_id
                review {
                    id
                    object_name
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
                    responses {
                        id
                        review_id
                        question_id
                        score
                        text
                    }
                    comments {
                        id
                        date
                        owner_type_id
                        name
                        email
                        comment
                    }
                }
                date
                owner_type_id
                name
                email
                comment
                validated
            }
        `;

        super.init();
    }
}

import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class CommentGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query ReviewGetCommentsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: reviewCommentsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query ReviewGetComments ($sql:[CoreSQLInput]) {
            coreObjects: reviewComments (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetComment ($sql:[CoreSQLInput]) {
            coreObject: reviewComment (sql:$sql) {
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation ReviewCreateComment ($payload:ReviewCommentInput!) {
            reviewCreateComment (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewActionComment ($payload:ReviewCommentInput! $action_id:Int!) {
            reviewActionComment (payload:$payload action_id:$action_id) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeleteComment ($id:Int!) {
            reviewDeleteComment (id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
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

import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class QuestionGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query ReviewGetQuestionsPagination ($sql:[CoreSQLInput] $filters:[CoreSQLInput]) {
            coreObjectsPagination: reviewQuestionsPagination (sql:$sql filters:$filters) {
                total
                objects (sql:$sql filters:$filters)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query ReviewGetRelationsQuestion ($configQuestionTypes:CoreConfigInput!) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query ReviewGetQuestions ($sql:[CoreSQLInput]) {
            coreObjects: reviewQuestions (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetQuestion (
            $sql:[CoreSQLInput]
            $configQuestionTypes:CoreConfigInput!
        ) {
            coreObject: reviewQuestion (sql:$sql) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation ReviewCreateQuestion ($payload:ReviewQuestionInput!) {
            reviewCreateQuestion (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewUpdateQuestion ($payload:ReviewQuestionInput!) {
            reviewUpdateQuestion (payload:$payload) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeleteQuestion ($lang_id:String! $id:Int!) {
            reviewDeleteQuestion (lang_id:$lang_id id:$id) {
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Review\\Models\\Question';
        this.table = 'review_question';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on ReviewQuestion {
                ix
                id
                lang_id
                poll_id
                type_id
                name
                description
                sort
                high_score
                data_lang
                average {
                    id
                    reviews
                    total
                    average
                }
            }
        `;

        this.relationsFields = `
            reviewPolls {
                id
                name
                default_high_score
            }
            reviewQuestionTypes: coreConfig (config:$configQuestionTypes)
        `;

        super.init();
    }
}

import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';


export class QuestionGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query ReviewGetQuestionsPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: reviewQuestionsPagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query ReviewGetRelationsQuestion ($configQuestionTypes:CoreConfigInput!){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query ReviewGetQuestions ($sql:[CoreSQLQueryInput]) {
            coreObjects: reviewQuestions (sql:$sql) {
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query ReviewGetQuestion (
            $sql:[CoreSQLQueryInput]
            $configQuestionTypes:CoreConfigInput!
        ) {
            coreObject: reviewQuestion (sql:$sql) {
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation ReviewAddQuestion ($object:ReviewQuestionInput!) {
            reviewAddQuestion (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewUpdateQuestion ($object:ReviewQuestionInput!) {
            reviewUpdateQuestion (object:$object) {
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation ReviewDeleteQuestion ($lang_id:String! $id:Int!) {
            reviewDeleteQuestion (lang_id:$lang_id id:$id) {
                ${this.fields}
            }
        }`;

    init() {
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
            }
        `;

        this.relationsFields = `
            reviewPolls {
                id
                name
            }
            reviewQuestionTypes: coreConfig (config:$configQuestionTypes) {
                ... on CoreConfigOption {
                    id
                    name
                }
            }
        `;

        super.init();
    }
}

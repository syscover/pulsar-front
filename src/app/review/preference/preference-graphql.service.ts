import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';


export class PreferenceGraphQLService extends GraphQLModel {

    /* queryObjects = gql`
        query ReviewGetPreferences ($keys:[String]!) {
            coreObjects: corePreferences (keys:$keys) {
                ${this.fields}
            }
        }`; */




    queryObject = gql`
        query ReviewGetPreferences ($keys:[String]!) {
            coreObject: corePreferences (keys:$keys) {
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation ReviewUpdatePreferences ($preferences:[CorePreferenceInput]) {
            coreUpdatePreferences (preferences:$preferences) {
                ${this.fields}
            }
        }`;

    /* mutationAddObject = gql`
        mutation ReviewAddPoll ($object:ReviewPollInput!) {
            reviewAddPoll (object:$object){
                ${this.fields}
            }
        }`;

    

    mutationDeleteObject = gql`
        mutation ReviewDeletePoll ($id:Int!) {
            reviewDeletePoll (id:$id) {
                ${this.fields}
            }
        }`; */

    init() {
        //this.model = 'Syscover\\Review\\Models\\Poll';
        //this.table = 'review_poll';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CorePreference {
                key
                value
            }
        `;

        super.init();
    }
}

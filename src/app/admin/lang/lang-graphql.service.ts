import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class LangGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Admin\\Models\\Lang'; // model of backoffice relative at this GraphQL service
    readonly fields = `
    ... on AdminLang {
            id
            name 
            icon 
            sort 
            active
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly mutationAddObject = gql`
        mutation AdminAddLang ($object:AdminLangInput!) {
            adminAddLang (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateLang ($object:AdminLangInput! $idOld:String!) {
            adminUpdateLang (object:$object idOld:$idOld){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteLang ($id:String!) {
            adminDeleteLang (id:$id){
                ${this.fields}
            }
        }`;
}

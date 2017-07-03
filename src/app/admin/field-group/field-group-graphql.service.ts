import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class FieldGroupGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Admin\\Models\\FieldGroup'; // model of backoffice relative at this GraphQL service
    readonly relationsFields = `
        coreConfig (key:$key) {
            ... on CoreConfigOptionType {
                id
                name
            }
        }
        adminResources {
            id
            name
        }
    `; // fields of relations object`
    readonly fields = `
    ... on AdminFieldGroup {
            id
            name
            resource_id
            resource {
                id
                name
            }
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination`

    readonly mutationAddObject = gql`
        mutation AdminAddFieldGroup ($object:AdminFieldGroupInput!) {
            adminAddFieldGroup (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateFieldGroup ($object:AdminFieldGroupInput!) {
            adminUpdateFieldGroup (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteFieldGroup ($id:String!) {
            adminDeleteFieldGroup (id:$id){
                ${this.fields}
            }
        }`;
}

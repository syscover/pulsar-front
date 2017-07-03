import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class AttachmentMimeGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Admin\\Models\\AttachmentMime'; // model of backoffice relative at this GraphQL service
    readonly fields = `
        id
        name
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly mutationAddObject = gql`
        mutation AdminAddAction ($object:AdminActionInput!) {
            adminAddAction (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateAction ($object:AdminActionInput! $idOld:String!) {
            adminUpdateAction (object:$object idOld:$idOld){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteAction ($id:String!) {
            adminDeleteAction (id:$id){
                ${this.fields}
            }
        }`;
}

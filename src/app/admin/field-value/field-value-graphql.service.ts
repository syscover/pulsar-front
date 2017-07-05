import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class FieldValueGraphQLService extends GraphQLModel {

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

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Admin\\Models\\FieldValue';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminField {
                id
                field_group_id
                name
                labels
                field_type_id
                field_type_name
                data_type_id
                data_type_name
                required
                sort
                max_length
                pattern
                label_class
                component_class
                data_lang
            }
        `;

        this.relationsFields = `
            coreConfig (config:$config) {
                ... on CoreConfigOptionType {
                    id
                    name
                }
            }
            adminFieldGroups {
                id
                name
            }
        `;

        super.init();
    }
}

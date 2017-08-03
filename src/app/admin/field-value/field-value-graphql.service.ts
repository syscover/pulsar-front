import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class FieldValueGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query AdminGetFieldValuesPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminFieldValuesPagination (filters:$filters sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query AdminGetFieldValues ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminFieldValues (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminFieldValue ($sql:[CoreSQLQueryInput]) {
            coreObject: adminFieldValue (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation AdminAddFieldValue ($object:AdminFieldValueInput!) {
            adminAddFieldValue (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateFieldValue ($object:AdminFieldValueInput! $idOld:String!) {
            adminUpdateFieldValue (object:$object idOld:$idOld){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteFieldValue ($field:ID! $id:String! $lang:String!) {
            adminDeleteFieldValue (field:$field id:$id lang:$lang){
                ${this.fields}
            }
        }`;

    init() {
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Admin\\Models\\FieldValue';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminFieldValue {
                id
                lang_id
                field_id
                counter
                sort
                featured
                name
                data_lang
            }
        `;

        super.init();
    }
}

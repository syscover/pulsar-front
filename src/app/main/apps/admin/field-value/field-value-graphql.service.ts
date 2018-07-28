import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class FieldValueGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetFieldValuesPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminFieldValuesPagination (filters:$filters sql:$sql) {
                total
                objects (sql:$sql)
                filtered
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
        mutation AdminUpdateFieldValue ($object:AdminFieldValueInput!) {
            adminUpdateFieldValue (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteFieldValue ($field_id:Int! $id:String! $lang_id:String!) {
            adminDeleteFieldValue (field_id:$field_id id:$id lang_id:$lang_id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\FieldValue';
        this.table = 'admin_field_value';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminFieldValue {
                ix
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

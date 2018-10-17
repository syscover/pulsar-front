import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class FieldValueGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetFieldValuesPagination ($sql:[CoreSQLInput] $filters:[CoreSQLInput]) {
            coreObjectsPagination: adminFieldValuesPagination (sql:$sql filters:$filters) {
                total
                objects (sql:$sql filters:$filters)
                filtered
            }
        }`;

    queryObjects = gql`
        query AdminGetFieldValues ($sql:[CoreSQLInput]) {
            coreObjects: adminFieldValues (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminFieldValue ($sql:[CoreSQLInput]) {
            coreObject: adminFieldValue (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateFieldValue ($payload:AdminFieldValueInput!) {
            adminCreateFieldValue (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateFieldValue ($payload:AdminFieldValueInput!) {
            adminUpdateFieldValue (payload:$payload){
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

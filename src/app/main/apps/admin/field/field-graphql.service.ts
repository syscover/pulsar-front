import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class FieldGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetFieldsPagination ($sql:[CoreSQLInput] $configFieldTypes:CoreConfigInput!) {
            coreObjectsPagination: adminFieldsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
            adminConfigFieldTypes:coreConfig (config:$configFieldTypes)
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsField ($sqlFieldGroup:[CoreSQLInput] $configFieldTypes:CoreConfigInput! $configDataTypes:CoreConfigInput!) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetFields ($sql:[CoreSQLInput] $sqlFieldGroup:[CoreSQLInput] $configFieldTypes:CoreConfigInput! $configDataTypes:CoreConfigInput!) {
            coreObjects: adminFields (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetField ($sql:[CoreSQLInput] $sqlFieldGroup:[CoreSQLInput] $configFieldTypes:CoreConfigInput! $configDataTypes:CoreConfigInput!) {
            coreObject: adminField (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateField ($payload:AdminFieldInput!) {
            adminCreateField (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateField ($payload:AdminFieldInput!) {
            adminUpdateField (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteField ($id:Int! $lang_id:String!) {
            adminDeleteField (id:$id lang_id:$lang_id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\Field';
        this.table = 'admin_field';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminField {
                id
                field_group_id
                field_group_name
                name
                labels {
                    id
                    value 
                }
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
                values {
                    ix
                    id
                    lang_id
                    counter
                    sort
                    featured
                    name
                }
                data_lang
            }
        `;

        this.relationsFields = `
            adminFieldGroups (sql:$sqlFieldGroup){
                id
                name
            }
            coreConfigFieldTypes:coreConfig (config:$configFieldTypes)
            coreConfigDataTypes:coreConfig (config:$configDataTypes)
        `;

        super.init();
    }
}

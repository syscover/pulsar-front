import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class FieldGraphQLService extends GraphQLModel {

    queryPaginationObject = gql`
        query AdminGetFieldsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminFieldsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsField ($configFieldTypes:CoreConfigInput! $configDataTypes:CoreConfigInput!) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetFields ($sql:[CoreSQLQueryInput] $configFieldTypes:CoreConfigInput! $configDataTypes:CoreConfigInput!) {
            coreObjects: adminFields (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetField ($sql:[CoreSQLQueryInput] $configFieldTypes:CoreConfigInput! $configDataTypes:CoreConfigInput!) {
            coreObject: adminField (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationAddObject = gql`
        mutation AdminAddField ($object:AdminFieldInput!) {
            adminAddField (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateField ($object:AdminFieldInput!) {
            adminUpdateField (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteField ($id:String! $lang:String) {
            adminDeleteField (id:$id lang:$lang){
                ${this.fields}
            }
        }`;

    init() {
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
            adminFieldGroups {
                id
                name
            }
            coreConfigFieldTypes:coreConfig (config:$configFieldTypes) {
                ... on CoreConfigOptionType {
                    id
                    name
                }
            }
            coreConfigDataTypes:coreConfig (config:$configDataTypes) {
                ... on CoreConfigOptionType {
                    id
                    name
                }
            }
        `;

        super.init();
    }
}

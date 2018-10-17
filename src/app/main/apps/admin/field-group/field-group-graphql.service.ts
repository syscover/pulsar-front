import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class FieldGroupGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetFieldGroupsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminFieldGroupsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query AdminGetRelationsFieldGroup ($configFieldGroupResources:CoreConfigInput!){
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query AdminGetFieldGroups ($sql:[CoreSQLInput]) {
            coreObjects: adminFieldGroups (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query AdminGetFieldGroup ($sql:[CoreSQLInput] $configFieldGroupResources:CoreConfigInput) {
            coreObject: adminFieldGroup (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateFieldGroup ($payload:AdminFieldGroupInput!) {
            adminCreateFieldGroup (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateFieldGroup ($payload:AdminFieldGroupInput!) {
            adminUpdateFieldGroup (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteFieldGroup ($id:Int!) {
            adminDeleteFieldGroup (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\FieldGroup';
        this.table = 'admin_field_group';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminFieldGroup {
                id
                name
                resource_id
                resource {
                    id
                    name
                }
            }
        `;

        this.relationsFields = `
            configFieldGroupResources:coreConfig (config:$configFieldGroupResources)
            adminResources {
                id
                name
            }
        `;

        super.init();
    }
}

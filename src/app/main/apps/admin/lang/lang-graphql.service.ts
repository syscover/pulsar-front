import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class LangGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetLangsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminLangsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query AdminGetLangs ($sql:[CoreSQLInput]) {
            coreObjects: adminLangs (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetLang ($sql:[CoreSQLInput]) {
            coreObject: adminLang (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation AdminCreateLang ($payload:AdminLangInput!) {
            adminCreateLang (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateLang ($payload:AdminLangInput!) {
            adminUpdateLang (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteLang ($id:String!) {
            adminDeleteLang (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Admin\\Models\\Lang';
        this.table = 'admin_lang';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminLang {
                ix
                id
                name 
                icon 
                sort 
                active
            }
        `;

        super.init();
    }
}

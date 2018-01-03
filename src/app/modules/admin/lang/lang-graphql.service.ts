import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/graphql/graphql-schema.class';
import gql from 'graphql-tag';

@Injectable()
export class LangGraphQLService extends GraphQLSchema {

    queryPaginationObject = gql`
        query AdminGetLangsPagination ($sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: adminLangsPagination (sql:$sql) {
                total
                filtered
                objects (sql:$sql)
            }
        }`;

    queryObjects = gql`
        query AdminGetLangs ($sql:[CoreSQLQueryInput]) {
            coreObjects: adminLangs (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetLang ($sql:[CoreSQLQueryInput]) {
            coreObject: adminLang (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation AdminAddLang ($object:AdminLangInput!) {
            adminAddLang (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateLang ($object:AdminLangInput!) {
            adminUpdateLang (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteLang ($id:String!) {
            adminDeleteLang (id:$id){
                ${this.fields}
            }
        }`;

    init() {
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

import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class LangGraphQLService extends GraphQLModel {

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
        mutation AdminUpdateLang ($object:AdminLangInput! $idOld:String!) {
            adminUpdateLang (object:$object idOld:$idOld){
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
        // model of backoffice relative at this GraphQL service
        this.objectModel = 'Syscover\\Admin\\Models\\Lang';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminLang {
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

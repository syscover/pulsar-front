import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

export class LangGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'lang'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectContainer = 'adminLang'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminLangsPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields; // fields of objects that have any relation with query object
    readonly fields = `
    ... on AdminLang {
            id
            name 
            icon 
            sort 
            active
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly queryRelationsObject: any;

    readonly queryPaginationObject = gql`
        query AdminGetLangsPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                objects (sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects;

    readonly queryObject = gql`
        query AdminGetLang ($sql:[CoreSQLQueryInput]) {
            adminLang (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddLang ($lang:AdminLangInput!) {
            adminAddLang (lang:$lang){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateLang ($lang:AdminLangInput! $idOld:String!) {
            adminUpdateLang (lang:$lang idOld:$idOld){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteLang ($id:String!) {
            adminDeleteLang (id:$id){
                ${this.fields}
            }
        }`;
}

import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class CountryGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'country'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectContainer = 'adminCountry'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminCountriesPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields; // fields of objects that have any relation with query object
    readonly fields = `
        ... on AdminCountry {
            id
            lang_id 
            name 
            sort 
            prefix 
            territorial_area_1 
            territorial_area_2 
            territorial_area_3 
            data_lang
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly queryRelationsObject: any;

    readonly queryPaginationObject = gql`
        query AdminGetCountriesPagination ($sql:[CoreSQLQueryInput] $lang:String) {
            ${this.paginationContainer} (sql:$sql lang:$lang) {
                total
                filtered
                objects (sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects;

    readonly queryObject = gql`
        query AdminGetCountry ($sql:[CoreSQLQueryInput]) {
            adminCountry (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddCountry ($country:AdminCountryInput!) {
            adminAddCountry (country:$country){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateCountry ($country:AdminCountryInput! $idOld:String!) {
            adminUpdateCountry (country:$country idOld:$idOld){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteCountry ($id:String! $lang:String!) {
            adminDeleteCountry (id:$id lang:$lang){
                ${this.fields}
            }
        }`;
}

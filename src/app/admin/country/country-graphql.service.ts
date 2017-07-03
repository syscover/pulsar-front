import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class CountryGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Admin\\Models\\Country'; // model of backoffice relative at this GraphQL service

    readonly mutationAddObject = gql`
        mutation AdminAddCountry ($object:AdminCountryInput!) {
            adminAddCountry (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateCountry ($object:AdminCountryInput! $idOld:String!) {
            adminUpdateCountry (object:$object idOld:$idOld){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteCountry ($id:String! $lang:String!) {
            adminDeleteCountry (id:$id lang:$lang){
                ${this.fields}
            }
        }`;

    init() {
        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
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
        `;

        super.init();
    }
}

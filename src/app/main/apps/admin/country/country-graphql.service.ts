import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class CountryGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query AdminGetCountriesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: adminCountriesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query AdminGetCountries ($sql:[CoreSQLInput]) {
            coreObjects: adminCountries (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query AdminGetCountry ($sql:[CoreSQLInput]) {
            coreObject: adminCountry (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationCreateObject = gql`
        mutation AdminAddCountry ($object:AdminCountryInput!) {
            adminAddCountry (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation AdminUpdateCountry ($object:AdminCountryInput!) {
            adminUpdateCountry (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation AdminDeleteCountry ($id:String! $lang_id:String!) {
            adminDeleteCountry (id:$id lang_id:$lang_id) {
                ${this.fields}
            }
        }`;

    init(): void
    {
        // model of backoffice relative at this GraphQL service
        this.model = 'Syscover\\Admin\\Models\\Country';
        this.table = 'admin_country';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on AdminCountry {
                ix
                id
                lang_id
                name
                slug
                sort
                prefix
                territorial_area_1
                territorial_area_2
                territorial_area_3
                zones
                data_lang
            }
        `;

        super.init();
    }
}

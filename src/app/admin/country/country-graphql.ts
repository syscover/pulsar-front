import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

export class CountryGraphQL implements GraphQLModel {

    readonly objectInputContainer = 'country'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectsContainer = 'countries'; // to know which is the wrapper that contain objects list in response
    readonly objectContainer = 'adminCountry'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminCountriesPagination'; // to know wich is the wrapper that contain pagination in response
    readonly fields = 'id lang_id name sort prefix territorial_area_1 territorial_area_2 territorial_area_3 data_lang'; // defaults fields that will be return

    readonly queryObjects = gql`
        query GetAdminCountriesPagination ($sql:[CoreSQLQueryInput] $lang:String) {
            ${this.paginationContainer} (sql:$sql lang:$lang) {
                total
                filtered
                ${this.objectsContainer}(sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObject = gql`
        query GetAdminCountry ($sql:[CoreSQLQueryInput]) {
            adminCountry (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly mutationAddObject = gql`
        mutation adminAddCountry ($country:AdminCountryInput!) {
            adminAddCountry (country:$country){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminAddCountry ($country:AdminCountryInput! $idOld:String!) {
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

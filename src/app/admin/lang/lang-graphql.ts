import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

export class LangGraphQL implements GraphQLModel {

    readonly objectInputContainer = 'lang'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectsContainer = 'langs'; // to know which is the wrapper that contain objects list in response
    readonly objectContainer = 'adminLang'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminLangsPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields; // fields of objects that have any relation with query object
    readonly fields = 'id name icon sort active'; // defaults fields that will be return

    readonly queryObjects = gql`
        query GetAdminLangsPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                ${this.objectsContainer}(sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryRelationsObject: any;

    readonly queryObject = gql`
        query GetAdminLang ($sql:[CoreSQLQueryInput]) {
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

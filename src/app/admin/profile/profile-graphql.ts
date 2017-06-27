import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

export class ProfileGraphQL implements GraphQLModel {

    readonly objectInputContainer = 'profile'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectsContainer = 'profiles'; // to know which is the wrapper that contain objects list in response
    readonly objectContainer = 'adminProfile'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminProfilesPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields;
    readonly fields = `
        id 
        name 
    `; // defaults fields that will be return

    readonly queryObjects = gql`
        query GetAdminProfilesPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                ${this.objectsContainer}(sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryRelationsObject;

    readonly queryObject = gql`
        query GetAdminProfile ($sql:[CoreSQLQueryInput]) {
            adminProfile (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddProfile ($profile:AdminProfileInput!) {
            adminAddProfile (profile:$profile){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateProfile ($profile:AdminProfileInput!) {
            adminUpdateProfile (profile:$profile){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteProfile ($id:String!) {
            adminDeleteProfile (id:$id){
                ${this.fields}
            }
        }`;
}

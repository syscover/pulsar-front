import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

export class PackageGraphQL implements GraphQLModel {

    readonly objectInputContainer = 'package'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectsContainer = 'packages'; // to know which is the wrapper that contain objects list in response
    readonly objectContainer = 'adminPackage'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminPackagesPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields;
    readonly fields = 'id name root active sort'; // defaults fields that will be return

    readonly queryObjects = gql`
        query GetAdminPackagesPagination ($sql:[CoreSQLQueryInput]) {
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
        query GetAdminPackage ($sql:[CoreSQLQueryInput]) {
            adminPackage (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddPackage ($package:AdminPackageInput!) {
            adminAddPackage (package:$package){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdatePackage ($package:AdminPackageInput!) {
            adminUpdatePackage (package:$package){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeletePackage ($id:String!) {
            adminDeletePackage (id:$id){
                ${this.fields}
            }
        }`;
}

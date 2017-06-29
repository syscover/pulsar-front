import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model';
import gql from 'graphql-tag';

@Injectable()
export class GroupCustomerClassTaxGraphQLService implements GraphQLModel {

    readonly objectInputContainer = 'action'; // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectsContainer = 'actions'; // to know which is the wrapper that contain objects list in response
    readonly objectContainer = 'adminAction'; // to know which is the wrappper that contain a object in response
    readonly paginationContainer = 'adminActionsPagination'; // to know wich is the wrapper that contain pagination in response
    readonly relationsFields;
    readonly fields = 'id name'; // defaults fields that will be return

    readonly queryRelationsObject;

    readonly queryPaginationObject = gql`
        query AdminGetActionsPagination ($sql:[CoreSQLQueryInput]) {
            ${this.paginationContainer} (sql:$sql) {
                total
                filtered
                ${this.objectsContainer}(sql:$sql){
                    ${this.fields}
                }
            }
        }`;

    readonly queryObjects;

    readonly queryObject = gql`
        query AdminGetAction ($sql:[CoreSQLQueryInput]) {
            adminAction (sql:$sql){
                ${this.fields}
            }
        }`;

    readonly mutationAddObject = gql`
        mutation AdminAddAction ($action:AdminActionInput!) {
            adminAddAction (action:$action){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation AdminUpdateAction ($action:AdminActionInput! $idOld:String!) {
            adminUpdateAction (action:$action idOld:$idOld){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation AdminDeleteAction ($id:String!) {
            adminDeleteAction (id:$id){
                ${this.fields}
            }
        }`;
}

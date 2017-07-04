import { GraphQLModel as GraphQLModelInterface } from './graphql-model.interface';
import gql from 'graphql-tag';

export class GraphQLModel implements GraphQLModelInterface {

    // model of backoffice relative at this GraphQL service
    objectModel: string;
    // fields of objects that have any relation with query object, set empty by defaul because is used in multiple queries
    relationsFields: string;
    // defaults fields that will be return, fragment inline only is necessary for pagination
    fields: string;

    // Query to get relations data to create new object
    queryRelationsObject: any;
    // Query to get pagination list objets
    queryPaginationObject: any;
    // Query to get list objets
    queryObjects: any;
    // Query to get a object
    queryObject: any;

    // Query to add object
    mutationAddObject: any;
    // Query to update object
    mutationUpdateObject: any;
    // Query to delete object
    mutationDeleteObject: any;

    constructor() {
        this.init();
    }

    init() {
        /*// Query to get pagination list objets
        this.queryPaginationObject = gql`
            query GetObjectsPagination ($model:String! $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination (model:$model sql:$sql) {
                    total
                    filtered
                    objects (sql:$sql) {
                        ${this.fields}
                    }
                }
            }`;

        // instance queryRelationsObject only if relationsFields is defined
        if (this.relationsFields && this.relationsFields !== '') {
            // Query to get relations data
            this.queryRelationsObject = gql`
                query GetRelationsObject ($config:CoreConfigInput!){
                    ${this.relationsFields}
                }`;
        }

        // Query to get pagination list objets
        this.queryObjects = gql`
            query GetObjects ($model:String! $sql:[CoreSQLQueryInput]) {
                coreObjects (model:$model sql:$sql){
                    ${this.fields}
                }
                ${this.relationsFields}
            }`;

        // Query to get a object
        this.queryObject = gql`
            query GetObject ($model:String! $sql:[CoreSQLQueryInput] $config:CoreConfigInput) {
                coreObject (model:$model sql:$sql){
                    ${this.fields}
                }
                ${this.relationsFields}
            }`;*/
    }
}

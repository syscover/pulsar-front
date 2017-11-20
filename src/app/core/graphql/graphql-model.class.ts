import { GraphQLModel as GraphQLModelInterface } from './graphql-model.interface';

export class GraphQLModel implements GraphQLModelInterface {

    // model of backoffice relative at this GraphQL service
    model: string;
    // table name
    table: string;
    // table that contain multilanguage records
    tableLang: string;
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

    init() { }
}

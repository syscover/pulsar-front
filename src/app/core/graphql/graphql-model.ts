export interface GraphQLModel {

    // to know which is the wrapper that will contain an object for to pass arguments
    readonly objectInputContainer: string;
    // to know which is the wrapper that contain objects list in response
    readonly objectsContainer: string;
    // to know which is the wrappper that contain a object in response
    readonly objectContainer: any;
    // to know wich is the wrapper that contain pagination in response
    readonly paginationContainer: string;
    // fields of objects that have any relation with query object
    readonly relationsFields: string;
    // defaults fields that will be return
    readonly fields: string;

    // Query to get pagination list objets
    readonly queryObjects: any;
    // Query to get relations data to create new object
    readonly queryRelationsObject: any;
    // Query to get a object
    readonly queryObject: any;
    // Query to add object
    readonly mutationAddObject: any;
    // Query to update object
    readonly mutationUpdateObject: any;
    // Query to delete object
    readonly mutationDeleteObject: any;
}

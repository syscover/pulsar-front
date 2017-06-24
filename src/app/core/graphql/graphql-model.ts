export interface GraphQLModel {
    // Wrapper that contain GraphQl data in query list
    readonly wrapper: string;
    // object that contains data in wrapper
    readonly dataList: string;
    // Query to list objects whith pagination
    readonly queryObjects: any;
    // Name of object to get in data
    readonly objectName: string;
    // Query to get a object
    readonly queryObject: any;
    // Query to add object
    readonly mutationAddObject: any;
    // Query to update object
    readonly mutationUpdateObject: any;
    // Query to delete object
    readonly mutationDeleteObject: any;
}

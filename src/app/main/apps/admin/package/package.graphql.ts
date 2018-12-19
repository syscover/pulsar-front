import gql from 'graphql-tag';

const fields = `
    id
    name
    root
    active
    sort
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Admin\\Models\\Package',
    table: 'admin_package',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query AdminGetPackagesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: adminPackagesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query AdminGetPackages ($sql:[CoreSQLInput]) {
            coreObjects: adminPackages (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query AdminGetPackage ($sql:[CoreSQLInput]) {
            coreObject: adminPackage (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation AdminCreatePackage ($payload:AdminPackageInput!) {
            adminCreatePackage (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation AdminUpdatePackage ($payload:AdminPackageInput!) {
            adminUpdatePackage (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation AdminDeletePackage ($id:Int!) {
            adminDeletePackage (id:$id) {
                ${fields}
            }
        }`
};

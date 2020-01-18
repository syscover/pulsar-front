import gql from 'graphql-tag';

const fields = `
    id
    name
    surname
    surname2
    tin
    gender
    birth_date
`;

const relationsFields = `
`;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Course',
    table: 'forem_course',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetCoursesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremCoursesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query ForemGetCourses ($sql:[CoreSQLInput]) {
            coreObjects: foremCourses (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ForemGetCourse ($sql:[CoreSQLInput]) {
            coreObject: foremCourse (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateCourse ($payload:ForemCourseInput!) {
            foremCreateCourse (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateCourse ($payload:ForemCourseInput!) {
            foremUpdateCourse (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteCourse ($id:String!) {
            foremDeleteCourse (id:$id) {
                ${fields}
            }
        }`
};

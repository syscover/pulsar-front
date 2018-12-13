import gql from 'graphql-tag';
import { graphQL as foremProfileGraphQL } from '../../admin/profile/profile.graphql';

const fields = `
    id
    profile_id
    profile {
        ${foremProfileGraphQL.fields}
    }
    code
    name
    slug
    country_id
    territorial_area_1_id
    territorial_area_2_id
    territorial_area_3_id
    zip
    locality
    address
    latitude
    longitude
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\EmploymentOffice',
    table: 'forem_employment_office',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetEmploymentOfficesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremEmploymentOfficesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryObjects: gql`
        query ForemGetEmploymentOffices ($sql:[CoreSQLInput]) {
            coreObjects: foremEmploymentOffices (sql:$sql){
                ${fields}
            }
        }`,

    queryObject: gql`
        query ForemGetEmploymentOffice ($sql:[CoreSQLInput]) {
            coreObject: foremEmploymentOffice (sql:$sql) {
                ${fields}
            }
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateEmploymentOffice ($payload:ForemEmploymentOfficeInput!) {
            foremCreateEmploymentOffice (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateEmploymentOffice ($payload:ForemEmploymentOfficeInput!) {
            foremUpdateEmploymentOffice (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteEmploymentOffice ($id:Int!) {
            foremDeleteEmploymentOffice (id:$id) {
                ${fields}
            }
        }`
};

import gql from 'graphql-tag';
import { graphQL as adminProfileGraphQL } from '../../admin/profile/profile.graphql';
import { graphQL as adminCountryGraphQL } from '../../admin/country/country.graphql';

const fields = `
    id
    profile_id
    profile {
        ${adminProfileGraphQL.fields}
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

const relationsFields = `
    adminCountries (sql:$sqlCountry) {
        ${adminCountryGraphQL.fields}
    }
    adminProfiles {
        ${adminProfileGraphQL.fields}
    }
`;

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

    queryRelationsObject: gql`
        query ForemGetRelationsEmploymentOffice ($sqlCountry:[CoreSQLInput]){
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ForemGetEmploymentOffices ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObjects: foremEmploymentOffices (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query ForemGetEmploymentOffice ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: foremEmploymentOffice (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
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

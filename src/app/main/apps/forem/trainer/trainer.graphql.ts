import gql from 'graphql-tag';
import { graphQL as foremProfilesGraphQL } from '../profile/profile.graphql';
import { graphQL as foremCategoriesGraphQL } from '../category/category.graphql';
import { graphQL as adminCountryGraphQL } from '../../admin/country/country.graphql';

const fields = `
    id
    profile_id
    academic_level_id
    name
    surname
    surname2
    gender_id
    birth_date
    tin
    email
    phone
    mobile
    availabilities
    has_authorization
    country_id
    territorial_area_1_id
    territorial_area_2_id
    territorial_area_3_id
    zip
    locality
    address
    latitude
    longitude

    is_register_jccm
    specialty
    categories
    teacher_training
    teaching_months
    occupation_months
    description
`;

const relationsFields = `
    adminCountries (sql:$sqlAdminCountry) {
        ${adminCountryGraphQL.fields}
    }
    foremProfiles {
        ${foremProfilesGraphQL.fields}
    }
    foremCategories {
        ${foremCategoriesGraphQL.fields}
    }
    foremAvailabilities: coreConfig (config:$configAvailabilities)
    foremGenders: coreConfig (config:$configGenders)
    foremTeacherTrainings: coreConfig (config:$configTeacherTrainings)
`;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Trainer',
    table: 'forem_trainer',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetTrainersPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremTrainersPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query ForemGetRelationsProfile (
            $configGenders:CoreConfigInput
            $configAvailabilities:CoreConfigInput
            $configTeacherTrainings:CoreConfigInput
            $sqlAdminCountry:[CoreSQLInput]
        ) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ForemGetTrainers (
            $sql:[CoreSQLInput] 
            $configGenders:CoreConfigInput
            $configAvailabilities:CoreConfigInput
            $configTeacherTrainings:CoreConfigInput
            $sqlAdminCountry:[CoreSQLInput]
        ) {
            coreObjects: foremTrainers (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query ForemGetTrainer (
            $sql:[CoreSQLInput] 
            $configGenders:CoreConfigInput
            $configAvailabilities:CoreConfigInput
            $configTeacherTrainings:CoreConfigInput
            $sqlAdminCountry:[CoreSQLInput]
        ) {
            coreObject: foremTrainer (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateTrainer ($payload:ForemTrainerInput!) {
            foremCreateTrainer (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateTrainer ($payload:ForemTrainerInput!) {
            foremUpdateTrainer (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteTrainer ($id:Int!) {
            foremDeleteTrainer (id:$id) {
                ${fields}
            }
        }`
};

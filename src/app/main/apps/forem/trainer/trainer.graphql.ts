import gql from 'graphql-tag';
import { graphQL as foremProfilesGraphQL } from '../profile/profile.graphql';

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
    
    availability
    authorization
    country_id
    territorial_area_1_id
    territorial_area_2_id
    territorial_area_3_id
    zip
    locality
    address
    latitude
    longitude
    specialty
    is_register_jccm
    categories
    teacher_training
    teaching_months
    occupation_months
    description
`;

const relationsFields = `
    foremProfiles {
        ${foremProfilesGraphQL.fields}
    }
    foremGenders: coreConfig (config:$configGenders)
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
        ) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ForemGetTrainers (
            $sql:[CoreSQLInput] 
            $configGenders:CoreConfigInput
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

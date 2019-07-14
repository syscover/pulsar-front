import gql from 'graphql-tag';

const fields = `
    id
    profile_id
    academic_level_id
    name
    surname
    surname2
    gender_id
    email
    phone
    mobile
    birth_date
    tin
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
    teacher_training
    teaching_months
    occupation_months
    description
`;

const relationsFields = ``;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Trainer',
    table: 'forem_province',
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

    queryObjects: gql`
        query ForemGetTrainers ($sql:[CoreSQLInput]) {
            coreObjects: foremTrainers (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query ForemGetTrainer ($sql:[CoreSQLInput]) {
            coreObject: foremTrainer (sql:$sql) {
                ${fields}
            }
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

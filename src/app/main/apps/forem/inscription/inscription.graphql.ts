import gql from 'graphql-tag';
import { graphQL as foremProvinceGraphQL } from '../province/province.graphql';
import { graphQL as foremLocalityGraphQL } from '../locality/locality.graphql';

const fields = `
    id
    group_id
    student_id
    exported
    reason_request_id
    other_reason_request
    observations

    approved_user
    approved_date
    approved
    
    code
    has_registry
    registry_number
    registry_date
    document_type_id
    document_number

    name
    surname
    surname2
    gender_id
    birth_date
    tin
    ssn
    email
    phone
    mobile
    address_type_id
    address
    province_id
    zip
    locality_id

    has_agent
    agent_name
    agent_surname
    agent_surname2
    agent_tin
    agent_address
    agent_province_id
    agent_zip
    agent_locality_id
    agent_email
    agent_phone
    agent_mobile
    agent_contact_schedule

    academic_level_id
    academic_level_specialty
    has_other_course
    other_course
    languages
    professional_certificates
    professional_experiences
    has_driving_license
    driving_licenses

    employment_situation_id

    unemployed_registration_date
    unemployed_situation_id
    employment_office_id

    professional_category_id
    functional_area_id
    worker_code

    company_name
    company_tin
    company_sector
    company_province_id
    company_locality_id
    company_address
    company_zip
    big_company

    ssn_authorization
    certification_authorization
    data_authorization
    marketing_authorization
`;

const relationsFields = `
    foremProvinces {
        ${foremProvinceGraphQL.fields}
    }
    foremGroups {
        id
        name
    }
    foremGenders: coreConfig (config:$configGenders)
    foremAddressTypes: coreConfig (config:$configAddressTypes)
    foremEmploymentSituations: coreConfig (config:$configEmploymentSituations)
`;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Inscription',
    table: 'forem_inscription',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetInscriptionsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: foremInscriptionsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query ForemGetRelationsInscription (
            $configGenders:CoreConfigInput
            $configAddressTypes:CoreConfigInput
            $configEmploymentSituations:CoreConfigInput
        ) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ForemGetInscriptions (
            $sql:[CoreSQLInput]
            $configGenders:CoreConfigInput
            $configAddressTypes:CoreConfigInput
            $configEmploymentSituations:CoreConfigInput
        ) {
            coreObjects: foremInscriptions (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query ForemGetInscription (
            $sql:[CoreSQLInput]
            $configGenders:CoreConfigInput
            $configAddressTypes:CoreConfigInput
            $configEmploymentSituations:CoreConfigInput
        ) {
            coreObject: foremInscription (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateInscription ($payload:ForemInscriptionInput!) {
            foremCreateInscription (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateInscription ($payload:ForemInscriptionInput!) {
            foremUpdateInscription (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteInscription ($id:Int!) {
            foremDeleteInscription (id:$id) {
                ${fields}
            }
        }`
};

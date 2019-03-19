import gql from 'graphql-tag';
import { graphQL as foremCategoryGraphQL } from '../category/category.graphql';
import { graphQL as foremExpedientsGraphQL} from '../expedient/expedient.graphql';
import { graphQL as foremActionsGraphQL } from '../action/action.graphql';
import { graphQL as marketableGraphQL } from '../../../core/components/marketable/marketable.graphql';
import { graphQL as adminCountryGraphQL } from '../../admin/country/country.graphql';
import { graphQL as adminAttachmentFamilyGraphQL } from '../../admin/attachment-family/attachment-family.graphql';
import { graphQL as adminAttachmentsGraphQL } from '../../../core/components/attachments/attachments.graphql';
import { graphQL as adminProfileGraphQL } from '../../admin/profile/profile.graphql';

const fields = `
    id
    group_id
    student_id
    exported
    approved_user
    approved_date
    approved
    name
    surname
    surname2
    gender_id
    birth_date
    id_card
    ssn
    email
    phone
    mobile
    code
    has_registry
    registry_number
    registry_date
    document_type_id
    document_number
    road_type_id
    zip
    address
    province_id
    locality_id
    has_driving_license
    driving_licenses
    employment_situation_id
    unemployed_registration_date
    unemployed_situation_id
    employment_office_id
    professional_category_id
    functional_area_id
    worker_code
    company
    tin
    workplace_sector
    workplace_province_id
    workplace_locality_id
    is_big_company
    workplace_address
    workplace_zip
    academic_level_id
    academic_level_specialty
    has_other_course
    other_course
    reason_request_id
    other_reason_request
    ssn_authorization
    certification_authorization
    data_authorization
    marketing_authorization
    has_agent
    agent_tin
    agent_name
    agent_surname
    agent_surname2
    agent_address
    agent_province_id
    agent_locality_id
    agent_zip
    agent_email
    agent_phone
    agent_mobile
    agent_contact_schedule
    languages
    professional_certificates
    professional_experiences
    observations
`;

const relationsFields = `
    
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
            $configTargets:CoreConfigInput 
            $configAssistances:CoreConfigInput 
            $configTypes:CoreConfigInput 
            $configModalities:CoreConfigInput
            $configGroupPrefixes:CoreConfigInput
            $sqlAdminCountry:[CoreSQLInput]
            $sqlAdminAttachmentFamily:[CoreSQLInput]
            ${marketableGraphQL.paramenters}
        ) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query ForemGetGroups (
            $sql:[CoreSQLInput] 
            $configTargets:CoreConfigInput 
            $configAssistances:CoreConfigInput 
            $configTypes:CoreConfigInput 
            $configModalities:CoreConfigInput
            $configGroupPrefixes:CoreConfigInput
            $sqlAdminCountry:[CoreSQLInput]
            $sqlAdminAttachmentFamily:[CoreSQLInput]
            ${marketableGraphQL.paramenters}
        ) {
            coreObjects: foremGroups (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query ForemGetGroup (
            $sql:[CoreSQLInput] 
            $configTargets:CoreConfigInput 
            $configAssistances:CoreConfigInput
            $configTypes:CoreConfigInput 
            $configModalities:CoreConfigInput
            $configGroupPrefixes:CoreConfigInput
            $sqlAdminCountry:[CoreSQLInput]
            $sqlAdminAttachmentFamily:[CoreSQLInput]
            ${marketableGraphQL.paramenters}
        ) {
            coreObject: foremGroup (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation ForemCreateGroup ($payload:ForemGroupInput!) {
            foremCreateGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation ForemUpdateGroup ($payload:ForemGroupInput!) {
            foremUpdateGroup (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation ForemDeleteGroup ($id:Int!) {
            foremDeleteGroup (id:$id) {
                ${fields}
            }
        }`
};

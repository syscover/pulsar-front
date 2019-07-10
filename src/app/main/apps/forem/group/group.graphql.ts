import gql from 'graphql-tag';
import { graphQL as foremCategoryGraphQL } from '../category/category.graphql';
import { graphQL as foremExpedientsGraphQL} from '../expedient/expedient.graphql';
import { graphQL as foremActionsGraphQL } from '../action/action.graphql';
import { graphQL as marketableGraphQL } from '@horus/components/marketable/marketable.graphql';
import { graphQL as adminCountryGraphQL } from '../../admin/country/country.graphql';
import { graphQL as adminAttachmentFamilyGraphQL } from '../../admin/attachment-family/attachment-family.graphql';
import { graphQL as adminAttachmentsGraphQL } from '@horus/components/attachments/attachments.graphql';
import { graphQL as adminProfileGraphQL } from '../../admin/profile/profile.graphql';

const fields = `
    id
    profile_id
    profile {
        ${adminProfileGraphQL.fields}
    }
    steps
    prefix_id
    code
    name
    slug
    category_id
    target_id
    assistance_id
    type_id
    certificate
    certificate_code
    hours
    subsidized_amount
    price
    price_hour
    contents_excerpt
    contents
    requirements
    observations
    action_id
    expedient_id
    starts_at
    ends_at
    schedule
    selection_date
    publish
    open
    featured
    country_id
    territorial_area_1_id
    territorial_area_2_id
    territorial_area_3_id
    zip
    locality
    address
    latitude
    longitude
    is_product
    product_id
    attachments {
        ${adminAttachmentsGraphQL.fields}
    }
    ${marketableGraphQL.fields}
`;

const relationsFields = `
    adminCountries (sql:$sqlAdminCountry) {
        ${adminCountryGraphQL.fields}
    }
    adminAttachmentFamilies (sql:$sqlAdminAttachmentFamily) {
        ${adminAttachmentFamilyGraphQL.fields}
    }
    adminProfiles {
        ${adminProfileGraphQL.fields}
    }
    foremExpedients {
        ${foremExpedientsGraphQL.fields}
    }
    foremActions {
        ${foremActionsGraphQL.fields}
    }
    foremCategories {
        ${foremCategoryGraphQL.fields}
    }
    foremTargets: coreConfig (config:$configTargets)
    foremAssistances: coreConfig (config:$configAssistances)
    foremTypes: coreConfig (config:$configTypes)
    foremModalities: coreConfig (config:$configModalities)
    foremGroupPrefixes: coreConfig (config:$configGroupPrefixes)
    foremSteps: coreConfig (config:$configSteps)
    ${marketableGraphQL.relationsFields}
`;

export const graphQL = {
    model: 'Syscover\\Forem\\Models\\Group',
    table: 'forem_group',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query ForemGetGroupsPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput] $configAssistances:CoreConfigInput $configTypes:CoreConfigInput) {
            coreObjectsPagination: foremGroupsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            foremAssistances: coreConfig (config:$configAssistances)
            foremTypes: coreConfig (config:$configTypes)
        }`,

    queryRelationsObject: gql`
        query ForemGetRelationsGroup (
            $configTargets:CoreConfigInput 
            $configAssistances:CoreConfigInput 
            $configTypes:CoreConfigInput
            $configModalities:CoreConfigInput
            $configGroupPrefixes:CoreConfigInput
            $configSteps:CoreConfigInput
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
            $configSteps:CoreConfigInput
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
            $configSteps:CoreConfigInput
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

import gql from 'graphql-tag';
import {graphQL as cmsFamilyGraphQL} from '../family/family.graphql';
import {graphQL as adminAttachmentFamilyGraphQL} from '../../admin/attachment-family/attachment-family.graphql';

const fields = `
    ix
    id
    name
    family_id
    family {
        ${cmsFamilyGraphQL.fields}
    }
    attachment_families
`;

const relationsFields = `
    cmsFamilies {
        ${cmsFamilyGraphQL.fields}
    }
    adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
        ${adminAttachmentFamilyGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Cms\\Models\\Section',
    table: 'cms_section',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query CmsGetSectionsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: cmsSectionsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query CmsGetRelationsSection ($sqlAttachmentFamily:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query CmsGetSections ($sql:[CoreSQLInput] $sqlAttachmentFamily:[CoreSQLInput]) {
            coreObjects: cmsSections (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query CmsGetSection ($sql:[CoreSQLInput] $sqlAttachmentFamily:[CoreSQLInput]) {
            coreObject: cmsSection (sql:$sql){
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation CmsCreateSection ($payload:CmsSectionInput!) {
            cmsCreateSection (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation CmsUpdateSection ($payload:CmsSectionInput!) {
            cmsUpdateSection (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation CmsDeleteSection ($id:String!) {
            cmsDeleteSection (id:$id){
                ${fields}
            }
        }`
};

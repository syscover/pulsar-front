import gql from 'graphql-tag';
import { graphQL as adminFieldGroupGraphQL } from './../../admin/field-group/field-group.graphql';

const fields = `
    id
    name
    excerpt_editor_id
    article_editor_id
    field_group_id 
    date 
    title
    slug
    link
    categories
    sort
    tags
    article_parent
    attachments
    data
`;

const relationsFields = `
    coreConfig (config:$configEditors)
    adminFieldGroups (sql:$sqlFieldGroup) {
        ${adminFieldGroupGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Cms\\Models\\Family',
    table: 'cms_family',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query CmsGetFamiliesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: cmsFamiliesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query CmsGetRelationsFamily ($configEditors:CoreConfigInput! $sqlFieldGroup:[CoreSQLInput]) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query CmsGetFamilies ($sql:[CoreSQLInput] $sqlFieldGroup:[CoreSQLInput] $configEditors:CoreConfigInput) {
            coreObjects: cmsFamilies (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    queryObject: gql`
        query CmsGetFamily ($sql:[CoreSQLInput] $sqlFieldGroup:[CoreSQLInput] $configEditors:CoreConfigInput) {
            coreObject: cmsFamily (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation CmsCreateFamily ($payload:CmsFamilyInput!) {
            cmsCreateFamily (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation CmsUpdateFamily ($payload:CmsFamilyInput!) {
            cmsUpdateFamily (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation CmsDeleteFamily ($id:Int!) {
            cmsDeleteFamily (id:$id) {
                ${fields}
            }
        }`
};

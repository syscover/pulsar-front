import gql from 'graphql-tag';
import { graphQL as cmsSectionGraphQL } from '../section/section.graphql';

const fields = `
    ix
    id
    lang_id
    name
    slug
    section_id
    sort
    data_lang
`;

const relationsFields = `
    cmsSections {
        ${cmsSectionGraphQL.fields}
    }
`;

export const graphQL = {
    model: 'Syscover\\Cms\\Models\\Category',
    table: 'cms_category',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query CmsGetCategoriesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput]) {
            coreObjectsPagination: cmsCategoriesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`,

    queryRelationsObject: gql`
        query CmsGetRelationsCategory {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query CmsGetCategories ($sql:[CoreSQLInput]) {
            coreObjects: cmsCategories (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query CmsGetCategory ($sql:[CoreSQLInput]) {
            coreObject: cmsCategory (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation CmsCreateCategory ($payload:CmsCategoryInput!) {
            cmsCreateCategory (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation CmsUpdateCategory ($payload:CmsCategoryInput!) {
            cmsUpdateCategory (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation CmsDeleteCategory ($id:Int! $lang_id:String!) {
            cmsDeleteCategory (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

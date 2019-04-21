import gql from 'graphql-tag';
import { graphQL as cmsSectionGraphQL } from '../section/section.graphql';
import { graphQL as cmsCategoryGraphQL } from '../category/category.graphql';
import { graphQL as cmsFamilyGraphQL } from '../family/family.graphql';
import { graphQL as adminAttachmentFamilyGraphQL } from '../../admin/attachment-family/attachment-family.graphql';
import { graphQL as attachmentGraphQL } from '@horus/components/attachments/attachments.graphql';

const fields = `
    ix
    id
    lang_id
    parent_id
    name
    author_id
    section_id
    section {
        ${cmsSectionGraphQL.fields}
    }
    family_id
    status_id
    publish
    date
    title
    slug
    categories_id
    categories {
        ${cmsCategoryGraphQL.fields}
    }
    link
    blank
    sort
    tags 
    excerpt
    article
    data_lang
    data
    attachments {
        ${attachmentGraphQL.fields}
    }
`;

const relationsFields = `
    cmsSections (sql:$sqlSection) {
        ${cmsSectionGraphQL.fields}
    }
    cmsFamilies (sql:$sqlFamily) {
        ${cmsFamilyGraphQL.fields}
    }
    cmsCategories (sql:$sqlCategory) {
        ${cmsCategoryGraphQL.fields}
    }
    cmsStatuses: coreConfig (config:$configStatuses)
    adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
        ${adminAttachmentFamilyGraphQL.fields}
    }
    cmsArticles (sql:$sqlArticle) {
        ix
        id
        name
    }
`;

export const graphQL = {
    model: 'Syscover\\Cms\\Models\\Article',
    table: 'cms_article',
    fields,
    relationsFields,

    queryPaginationObject: gql`
        query CmsGetArticlesPagination ($filters:[CoreSQLInput] $sql:[CoreSQLInput] $config:CoreConfigInput!) {
            coreObjectsPagination: cmsArticlesPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
            cmsStatuses: coreConfig (config:$config)
        }`,

    queryRelationsObject: gql`
        query CmsGetRelationsArticle (
            $sqlSection: [CoreSQLInput]
            $sqlFamily: [CoreSQLInput]
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlArticle:[CoreSQLInput]
            $configStatuses:CoreConfigInput!
        ) {
            ${relationsFields}
        }`,

    queryObjects: gql`
        query CmsGetArticles ($sql:[CoreSQLInput]) {
            coreObjects: cmsArticles (sql:$sql) {
                ${fields}
            }
        }`,

    queryObject: gql`
        query CmsGetArticle (
            $sql:[CoreSQLInput]
            $sqlSection: [CoreSQLInput]
            $sqlFamily: [CoreSQLInput]
            $sqlAttachmentFamily:[CoreSQLInput]
            $sqlCategory:[CoreSQLInput]
            $sqlArticle:[CoreSQLInput]
            $configStatuses:CoreConfigInput!
        ) {
            coreObject: cmsArticle (sql:$sql) {
                ${fields}
            }
            ${relationsFields}
        }`,

    mutationCreateObject: gql`
        mutation CmsCreateArticle ($payload:CmsArticleInput!) {
            cmsCreateArticle (payload:$payload) {
                ${fields}
            }
        }`,

    mutationUpdateObject: gql`
        mutation CmsUpdateArticle ($payload:CmsArticleInput!) {
            cmsUpdateArticle (payload:$payload) {
                ${fields}
            }
        }`,

    mutationDeleteObject: gql`
        mutation CmsDeleteArticle ($id:Int! $lang_id:String!) {
            cmsDeleteArticle (id:$id lang_id:$lang_id) {
                ${fields}
            }
        }`
};

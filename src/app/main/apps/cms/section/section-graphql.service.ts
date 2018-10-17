import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class SectionGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query CmsGetSectionsPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: cmsSectionsPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query CmsGetRelationsSection ($sqlAttachmentFamily:[CoreSQLInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query CmsGetSections ($sql:[CoreSQLInput] $sqlAttachmentFamily:[CoreSQLInput]) {
            coreObjects: cmsSections (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    queryObject = gql`
        query CmsGetSection ($sql:[CoreSQLInput] $sqlAttachmentFamily:[CoreSQLInput]) {
            coreObject: cmsSection (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation CmsCreateSection ($payload:CmsSectionInput!) {
            cmsCreateSection (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation CmsUpdateSection ($payload:CmsSectionInput!) {
            cmsUpdateSection (payload:$payload){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation CmsDeleteSection ($id:String!) {
            cmsDeleteSection (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Cms\\Models\\Section';
        this.table = 'cms_section';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on CmsSection {
                ix
                id
                name
                family_id
                family {
                    id
                    name
                }
                attachment_families
            }
        `;

        this.relationsFields = `
            cmsFamilies {
                id
                name
            }
            adminAttachmentFamilies (sql:$sqlAttachmentFamily) {
                id
                name
            }
        `;

        super.init();
    }
}


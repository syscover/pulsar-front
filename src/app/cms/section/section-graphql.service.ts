import { Injectable } from '@angular/core';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import gql from 'graphql-tag';

@Injectable()
export class SectionGraphQLService extends GraphQLModel {

    readonly objectModel = 'Syscover\\Cms\\Models\\Section'; // model of backoffice relative at this GraphQL service
    readonly relationsFields = `
        cmsFamilies {
            id
            name
        }
    `; // fields of relations object`
    readonly fields = `
    ... on CmsSection {
            id
            name
            article_family_id
            family {
                id
                name
            }
        }
    `; // defaults fields that will be return, fragment inline only is necessary for pagination

    readonly mutationAddObject = gql`
        mutation CmsAddSection ($object:CmsSectionInput!) {
            cmsAddSection (object:$object){
                ${this.fields}
            }
        }`;

    readonly mutationUpdateObject = gql`
        mutation CmsUpdateSection ($object:CmsSectionInput! $idOld:String!) {
            cmsUpdateSection (object:$object idOld:$idOld){
                ${this.fields}
            }
        }`;

    readonly mutationDeleteObject = gql`
        mutation CmsDeleteSection ($id:String!) {
            cmsDeleteSection (id:$id){
                ${this.fields}
            }
        }`;
}

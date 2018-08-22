import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class SectionGraphQLService extends GraphQLSchema 
{
    queryPaginationObject = gql`
        query MarketGetSectionsPagination ($filters:[CoreSQLQueryInput] $sql:[CoreSQLQueryInput]) {
            coreObjectsPagination: marketSectionsPagination (filters:$filters sql:$sql) {
                total
                objects (filters:$filters sql:$sql)
                filtered
            }
        }`;

    queryObjects = gql`
        query MarketGetSections ($sql:[CoreSQLQueryInput]) {
            coreObjects: marketSections (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetSection ($sql:[CoreSQLQueryInput]) {
            coreObject: marketSection (sql:$sql){
                ${this.fields}
            }
        }`;

    mutationAddObject = gql`
        mutation MarketAddSection ($object:MarketSectionInput!) {
            marketAddSection (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateSection ($object:MarketSectionInput!) {
            marketUpdateSection (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteSection ($id:String!) {
            marketDeleteSection (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Market\\Models\\Section';
        this.table = 'market_section';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketSection {
                ix
                id
                lang_id
                name
                slug
            }
        `;

        super.init();
    }
}


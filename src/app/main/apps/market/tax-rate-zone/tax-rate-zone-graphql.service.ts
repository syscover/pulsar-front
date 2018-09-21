import { Injectable } from '@angular/core';
import { GraphQLSchema } from './../../../core/structures/graphql-schema';
import gql from 'graphql-tag';

@Injectable()
export class TaxRateZoneGraphQLService extends GraphQLSchema
{
    queryPaginationObject = gql`
        query MarketGetTaxRateZonesPagination ($sql:[CoreSQLInput]) {
            coreObjectsPagination: marketTaxRateZonesPagination (sql:$sql) {
                total
                objects (sql:$sql)
                filtered
            }
        }`;

    queryRelationsObject = gql`
        query MarketRelationsTaxRateZone ($sqlCountry:[CoreSQLInput]) {
            ${this.relationsFields}
        }`;

    queryObjects = gql`
        query MarketGetTaxRateZones ($sql:[CoreSQLInput]) {
            coreObjects: marketTaxRateZones (sql:$sql){
                ${this.fields}
            }
        }`;

    queryObject = gql`
        query MarketGetTaxRateZone ($sql:[CoreSQLInput] $sqlCountry:[CoreSQLInput]) {
            coreObject: marketTaxRateZone (sql:$sql){
                ${this.fields}
            }
            ${this.relationsFields}
        }`;

    mutationCreateObject = gql`
        mutation MarketCreateTaxRateZone ($object:MarketTaxRateZoneInput!) {
            marketCreateTaxRateZone (object:$object){
                ${this.fields}
            }
        }`;

    mutationUpdateObject = gql`
        mutation MarketUpdateTaxRateZone ($object:MarketTaxRateZoneInput!) {
            marketUpdateTaxRateZone (object:$object){
                ${this.fields}
            }
        }`;

    mutationDeleteObject = gql`
        mutation MarketDeleteTaxRateZone ($id:Int!) {
            marketDeleteTaxRateZone (id:$id){
                ${this.fields}
            }
        }`;

    init(): void
    {
        this.model = 'Syscover\\Market\\Models\\TaxRateZone';
        this.table = 'market_tax_rate_zone';

        // defaults fields that will be return, fragment necessary for return CoreObjectInterface
        this.fields = `
            ... on MarketTaxRateZone {
                id
                name
                country_id
                territorial_area_1_id
                territorial_area_2_id
                territorial_area_3_id
                zip
                tax_rate
            }
        `;

        this.relationsFields = `
            adminCountries (sql:$sqlCountry) {
                id
                name
            }
        `;

        super.init();
    }
}

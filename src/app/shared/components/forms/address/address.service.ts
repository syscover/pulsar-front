import { Injectable } from '@angular/core';
import { CoreService } from './../../../super/core.service';
import { FieldGraphQLService } from './../../../../admin/field/field-graphql.service';
import { Country, TerritorialArea1 } from './../../../../admin/admin.models';
import { environment } from './../../../../../environments/environment';
import gql from 'graphql-tag';

@Injectable()
export class AddressService {

    public country: Country;

    constructor(
        private objectService: CoreService
    ) { }

    gerResources(args) {

        if (environment.debug) console.log('DEBUG - arguments to get resources: ', args);

        return this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: gql`
                    query AddressResources (
                        $sqlAdminTerritorialAreas1:[CoreSQLQueryInput] 
                        $sqlAdminTerritorialAreas2:[CoreSQLQueryInput] 
                        $sqlAdminTerritorialAreas3:[CoreSQLQueryInput]
                    ) {
                        adminTerritorialAreas1: adminTerritorialAreas1 (sql:$sqlAdminTerritorialAreas1){
                            id
                            name
                        }
                        adminTerritorialAreas2: adminTerritorialAreas2 (sql:$sqlAdminTerritorialAreas2){
                            id
                            name
                        }
                        adminTerritorialAreas3: adminTerritorialAreas3 (sql:$sqlAdminTerritorialAreas3){
                            id
                            name
                        }
                    }
                `,
                variables: args
            });
    }

    territorialAreas1(country: Country) {
        if (country) {
            return this.objectService
                .proxyGraphQL()
                .watchQuery({
                    query: gql`
                        query AdminGetTerritorialAreas1 ($sql:[CoreSQLQueryInput]) {
                            coreObjects: adminTerritorialAreas1 (sql:$sql){
                                id
                                name
                            }
                        }
                    `,
                    variables: {
                        sql: [
                            {
                                command: 'where',
                                column: 'country_id',
                                operator: '=',
                                value: country.id
                            },
                            {
                                command: 'where',
                                column: 'admin_country.lang_id',
                                operator: '=',
                                value: country.lang_id
                            }
                        ]
                    }
                });
        }

        return null;
    }

    territorialAreas2(territorialArea1: TerritorialArea1) {
        if (territorialArea1) {
            return this.objectService
                .proxyGraphQL()
                    .watchQuery({
                    query: gql`
                        query AdminGetTerritorialAreas2 ($sql:[CoreSQLQueryInput]) {
                            coreObjects: adminTerritorialAreas2 (sql:$sql){
                                id
                                name
                            }
                        }
                    `,
                    variables: {
                        sql: [
                            {
                                command: 'where',
                                column: 'territorial_area_1_id',
                                operator: '=',
                                value: territorialArea1.id
                            },
                            {
                                command: 'where',
                                column: 'admin_country.lang_id',
                                operator: '=',
                                value: this.country.lang_id
                            }
                        ]
                    }
                });
        }

        return null;
    }

    territorialAreas3(territorialArea2: TerritorialArea1) {
        if (territorialArea2) {
            return this.objectService
                .proxyGraphQL()
                    .watchQuery({
                    query: gql`
                        query AdminGetTerritorialAreas3 ($sql:[CoreSQLQueryInput]) {
                            coreObjects: adminTerritorialAreas3 (sql:$sql){
                                id
                                name
                            }
                        }
                    `,
                    variables: {
                        sql: [
                            {
                                command: 'where',
                                column: 'territorial_area_2_id',
                                operator: '=',
                                value: territorialArea2.id
                            },
                            {
                                command: 'where',
                                column: 'admin_country.lang_id',
                                operator: '=',
                                value: this.country.lang_id
                            }
                        ]
                    }
                });
        }

        return null;
    }
}

import { Injectable } from '@angular/core';

import { CoreService } from './../../../super/core.service';
import { FieldGraphQLService } from './../../../../admin/field/field-graphql.service';
import { Country } from './../../../../admin/admin.models';
import { environment } from './../../../../../environments/environment';
import gql from 'graphql-tag';

@Injectable()
export class AddressService {

    constructor(
        private objectService: CoreService
    ) { }

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
}

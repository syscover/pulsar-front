import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

@Injectable()
export class UpdateService
{
    env: any = environment;

    constructor(
        private _http: HttpService
    ) {}

    checkUpdates(): Observable<ApolloQueryResult<Object>>
    {
        return this._http
            .apolloClient()
            .watchQuery({
                query: gql`
                    query AdminCheckUpdates {
                        adminCheckUpdates {
                            id
                            name
                            version
                            package_id
                            package {
                                id
                                name
                            }
                        }
                    }
                `
            })
            .valueChanges;
    }
}

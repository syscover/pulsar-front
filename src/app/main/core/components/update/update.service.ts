import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from 'environments/environment';
import gql from 'graphql-tag';

@Injectable()
export class UpdateService
{
    env: any = environment;

    constructor(
        private _http: HttpService
    ) {}

    checkUpdates(): void
    {
        const ob = this._http
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
            .valueChanges
            .subscribe(({data}: any) => {
                ob.unsubscribe();
                if (this.env.debug) console.log('DEBUG - response of adminCheckUpdates query: ', data);
            });
    }
}

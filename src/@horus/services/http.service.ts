import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { throwError } from 'rxjs';
import { Core } from '../../app/main/core/foundations/core';
import * as _ from 'lodash';

@Injectable()
export class HttpService extends Core
{
    protected headers: HttpHeaders;
    protected options: object;
    protected http: HttpClient;
    protected apollo: Apollo;
    protected router: Router;
    
    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.http = this.injector.get(HttpClient);
        this.apollo = this.injector.get(Apollo);
        this.router = this.injector.get(Router);

        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.options = { headers: this.headers };
    }

    apolloClient(): Apollo
    {
        return this.apollo;
    }

    httpClient(): HttpClient
    {
        return this.http;
    }

    private handleError = (err) => {
        console.log(err);
        if (err.status === 401) this.router.navigate(['/pulsar/login']); // redirect to login if token is invalid
       
        return throwError('Error Observable.throw: ' + err.statusText);
    }

    protected setEndpoint(urlAddons: string): void
    {
        // set api URL
        this.restUrl = this.restUrl + urlAddons;
    }

    protected getEndpoint(action: string, params?: Params): string
    {
        let urlParams = '';
        /**
         * If you have any parameters the url is composed
         * according to the order of parameters
         */
        if (params !== undefined) {
            urlParams = '/' + _.values(params).join('/');
        }

        if (action === 'search') {
            return `${this.restUrl}/search${urlParams}`;
        }

        /**
         * For actions get, find, store, update and delete
        */
        return `${this.restUrl}${urlParams}`;
    }
}

import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { Core } from './../structures/core';
import * as _ from 'lodash';

@Injectable()
export class HttpService extends Core
{
    protected headers: HttpHeaders;
    protected options: Object;
    protected httpClient: HttpClient;
    protected apollo: Apollo;
    protected router: Router;
    
    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.httpClient = this.injector.get(HttpClient);
        this.apollo = this.injector.get(Apollo);
        this.router = this.injector.get(Router);

        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.options = { headers: this.headers };
    }

    apolloClient(): Apollo
    {
        return this.apollo;
    }

    private handleError = (err) => {
        console.log(err);
        if (err.status === 401) this.router.navigate(['/pulsar/login']); // redirect to login if token is invalid
       
        return Observable.throw('Error Observable.throw: ' + err.statusText);
    }

    protected setEndpoint(urlAddons: string): void
    {
        // set api URL
        this.apiUrl = this.apiUrl + urlAddons;
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
            return `${this.apiUrl}/search${urlParams}`;
        }

        /**
         * For actions get, find, store, update and delete
        */
        return `${this.apiUrl}${urlParams}`;
    }
}

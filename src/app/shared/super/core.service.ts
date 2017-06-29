import { Injectable, Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApolloService } from './../../core/graphql/apollo-service';
import { AuthHttp } from 'angular2-jwt';
import { Core } from './core';
import { JsonResponse } from './../classes/json-respose';

import * as _ from 'lodash';

@Injectable()
export class CoreService extends Core {

    protected headers: Headers;
    protected options: RequestOptions;
    protected http: Http;
    protected authHttp: AuthHttp;
    protected apolloService: ApolloService;
    protected router: Router;

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.http = this.injector.get(Http);
        this.authHttp = this.injector.get(AuthHttp);
        this.apolloService = this.injector.get(ApolloService);

        this.router = this.injector.get(Router);

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    proxyGraphQL() {
        return this.apolloService
            .apollo(this.graphqlUri);
    }

    proxyGet(action: string, params: Params = undefined) {
        return this.authHttp
            .get(this.getEndpoint(action, params), this.apiUrl)
            .catch(this.handleError);
    }

    proxyPost(action: string, object: any, params: Params = undefined) {
        return this.authHttp
            .post(this.getEndpoint(action, params), object, this.options)
            .catch(this.handleError);
    }

    proxyPut(action: string, object: any, params: Params) {
        return this.authHttp
            .put(this.getEndpoint(action, params), object, this.options)
            .catch(this.handleError);
    }

    proxyDelete(action: string, params: Params) {
        return this.authHttp
            .delete(this.getEndpoint(action, params))
            .catch(this.handleError);
    }

    private handleError = (err) => {
        console.log(err);
        if (err.status === 401) {
            this.router.navigate(['/pulsar/login']); // redirect to login if token is invalid
        }
        return Observable.throw('Error Observable.throw: ' + err.statusText);
    }

    searchRecords(object: any, params: Params = undefined): Observable<JsonResponse> {
        return this.proxyPost('search', object, params)
            .map((response: Response) => response.json());
    }

    getRecords(params: Params = undefined): Observable<JsonResponse> {
        return this.proxyGet('get', params)
            .map((response: Response) => response.json());
    }

    getRecord(params: Params): Observable<JsonResponse> {
        return this.proxyGet('find', params)
            .map((response: Response) => response.json());
    }

    storeRecord(object: any, params: Params = undefined) {
        return this.proxyPost('store', object, params)
            .map(response => response.json());
    }

    updateRecord(object: any, params: Params) {
        return this.proxyPut('put', object, params)
            .map(response => response.json());
    }

    deleteRecord(params: Params) {
        return this.proxyDelete('delete', params)
            .map(response => response.json());
    }

    protected setEndpoint(urlAddons: string) {
        // set api URL
        this.apiUrl = this.apiUrl + urlAddons; 
    }

    protected getEndpoint(action: string, params: Params = undefined) {

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

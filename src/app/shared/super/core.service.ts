import { Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from 'angular2-jwt';
import { Core } from './core';
import { JsonResponse } from './../classes/json-respose';

import * as _ from 'lodash';

export class CoreService extends Core {

    protected headers: Headers;
    protected options: RequestOptions;
    protected http: Http;
    protected authHttp: AuthHttp;

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.http = this.injector.get(Http);
        this.authHttp = this.injector.get(AuthHttp);

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    proxyGet(action: string, params: Params = undefined) {
        return this.authHttp
            .get(this.getEndpoint(action, params), this.apiUrl);
    }

    proxyPost(action: string, object: any, params: Params = undefined) {
        return this.authHttp
            .post(this.getEndpoint(action, params), object, this.options);
    }

    proxyPut(action: string, object: any, params: Params) {
        return this.authHttp
            .put(this.getEndpoint(action, params), object, this.options);
    }

    proxyDelete(action: string, params: Params) {
        return this.authHttp
            .delete(this.getEndpoint(action, params));
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
        this.apiUrl = this.apiUrl + urlAddons; // set api URL
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

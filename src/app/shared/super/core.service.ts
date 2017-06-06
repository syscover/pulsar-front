import { Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Core } from './core';
import { JsonResponse } from './../classes/json-respose';

import * as _ from 'lodash';

export class CoreService extends Core {

    protected headers: Headers;
    protected options: RequestOptions;
    protected http: Http;
    private _baseUri: string;

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.http = injector.get(Http);

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    proxyGet(action: string, params: Params = undefined) {
        return this.http
            .get(this.getApiUrl(action, params), this.apiUrlPrefix);
    }

    proxyPost(action: string, object: any, params: Params = undefined) {
        return this.http
            .post(this.getApiUrl(action, params), object, this.options);
    }

    proxyPut(action: string, object: any, params: Params) {
        return this.http
            .put(this.getApiUrl(action, params), object, this.options);
    }

    proxyDelete(action: string, params: Params) {
        return this.http
            .delete(this.getApiUrl(action, params));
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

    // use magick methods to keep the same format that setApiUrl method
    protected setBaseUri(baseUri: string) {
        this._baseUri = baseUri; // set base uri
    }

    get baseUri(): string {
        return this._baseUri; // get base uri
    }

    protected setApiUrl(urlAddons: string) {
        this.apiUrlPrefix = this.apiUrlPrefix + urlAddons; // set api URL
    }

    protected getApiUrl(action: string, params: Params = undefined) {

        let urlParams = '';
        /**
         * If you have any parameters the url is composed 
         * according to the order of parameters
         */
        if (params !== undefined) {
            urlParams = '/' + _.values(params).join('/');
        }

        if (action === 'search') {
            return `${this.apiUrlPrefix}/search${urlParams}`;
        }

        /**
         * For actions get, find, store, update and delete
        */
        return `${this.apiUrlPrefix}${urlParams}`;
    }
}

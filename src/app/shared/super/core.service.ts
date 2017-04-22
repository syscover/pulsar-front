import { Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { JsonResponse } from './../classes/json-respose';

import * as appGlobals from './../../core/app-globals';

export class CoreService {

    protected headers: Headers;
    protected options: RequestOptions;
    protected http: Http;
    protected appRootPrefix: string = appGlobals.appRootPrefix;
    protected apiUrlPrefix: string = appGlobals.apiUrlPrefix;
    private _baseUri: string;

    constructor(
        protected injector: Injector
    ) {
        this.http = injector.get(Http);

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    searchRecords(object: any): Observable<JsonResponse> {
        return this.http
            .post(this.getApiUrl('search'), object, this.options)
            .map((response: Response) => response.json());
    }

    getRecords(): Observable<JsonResponse> {
        return this.http
            .get(this.getApiUrl('get'), this.apiUrlPrefix)
            .map((response: Response) => response.json());
    }

    getRecord(id: any, lang: string = undefined): Observable<JsonResponse> {
        return this.http
            .get(this.getApiUrl('find', id, lang))
            .map((response: Response) => response.json());
    }

    storeRecord(object: any) {
        return this.http
            .post(this.getApiUrl('store'), object, this.options)
            .map(response => response.json());
    }

    updateRecord(object: any, id: any, lang: string = undefined) {
        return this.http
            .put(this.getApiUrl('update', id, lang), object, this.options)
            .map(response => response.json());
    }

    deleteRecord(id: any, lang: string = undefined) {
        return this.http
            .delete(this.getApiUrl('delete', id, lang))
            .map(response => response.json());
    }

    protected setBaseUri(baseUri: string) {
        this._baseUri = baseUri; // set base uri
    }

    get baseUri(): string {
        return this._baseUri; // get base uri
    }

    protected setApiUrl(urlAddons: string) {
        this.apiUrlPrefix = this.apiUrlPrefix + urlAddons; // set api URL
    }

    protected getApiUrl(action: string, id: any = undefined, lang: string = undefined) {
        if (action === 'get') {
            if (lang === undefined) {   // check is object has language
                return `${this.apiUrlPrefix}`;
            } else {
                return `${this.apiUrlPrefix}/${lang}`;
            }
        }

        if (action === 'find') {
            if (lang === undefined) {   // check is object has language
                return `${this.apiUrlPrefix}/${id}`;
            } else {
                return `${this.apiUrlPrefix}/${id}/${lang}`;
            }
        }

        if (action === 'store') {
            return `${this.apiUrlPrefix}`;
        }

        if (action === 'search') {
            return `${this.apiUrlPrefix}/search`;
        }

        if (action === 'update') {
            if (lang === undefined) {   // check is object has language
                return `${this.apiUrlPrefix}/${id}`;
            } else {
                return `${this.apiUrlPrefix}/${id}/${lang}`;
            }
        }

        if (action === 'delete') {
            if (lang === undefined) {   // check is object has language
                return `${this.apiUrlPrefix}/${id}`;
            } else {
                return `${this.apiUrlPrefix}/${id}/${lang}`;
            }
        }
    }

}

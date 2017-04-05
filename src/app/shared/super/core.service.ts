import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import * as config from '../app-globals';

export class CoreService {

    private parentApiUrl: string = config.apiUrlPrefix;
    private parentBaseUri: string;

    constructor(
        protected parentHttp: Http
    ) { }

    getRecords(): Observable<any[]> {
        return this.parentHttp
            .get(this.getApiUrl('get'), this.parentApiUrl)
            .map((response: Response) => response.json().data as any[]);
    }

    getRecord(id: any, lang: string = undefined): Observable<any> {
        return this.parentHttp
            .get(this.getApiUrl('find', id, lang))
            .map((response: Response) => response.json().data as any);
    }

    storeRecord(object: any) {
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const options   = new RequestOptions({ headers: headers });

        return this.parentHttp
            .post(this.getApiUrl('store'), object, options)
            .map(response => response.json());
    }

    updateRecord(object: any, id: any, lang: string = undefined) {
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const options   = new RequestOptions({ headers: headers });

        return this.parentHttp
            .put(this.getApiUrl('update', id, lang), object, options)
            .map(response => response.json());
    }

    deleteRecord(id: any, lang: string = undefined) {
        return this.parentHttp
            .delete(this.getApiUrl('delete', id, lang))
            .map(response => response.json());
    }

    protected setBaseUri(baseUri: string) {
        this.parentBaseUri = baseUri; // set base uri
    }

    get baseUri(): string {
        return this.parentBaseUri; // get base uri
    }

    protected setApiUrl(urlAddons: string) {
        this.parentApiUrl = this.parentApiUrl + urlAddons; // set api URL
    }

    protected getApiUrl(action: string, id: any = undefined, lang: string = undefined) {
        if (action === 'get') {
            if (lang === undefined) {   // check is object has language
                return `${this.parentApiUrl}`;
            } else {
                return `${this.parentApiUrl}/${lang}`;
            }
        }

        if (action === 'find') {
            if (lang === undefined) {   // check is object has language
                return `${this.parentApiUrl}/${id}`;
            } else {
                return `${this.parentApiUrl}/${id}/${lang}`;
            }
        }

        if (action === 'store') {
            return `${this.parentApiUrl}`;
        }

        if (action === 'search') {
            return `${this.parentApiUrl}/search`;
        }

        if (action === 'update') {
            if (lang === undefined) {   // check is object has language
                return `${this.parentApiUrl}/${id}`;
            } else {
                return `${this.parentApiUrl}/${id}/${lang}`;
            }
        }

        if (action === 'delete') {
            if (lang === undefined) {   // check is object has language
                return `${this.parentApiUrl}/${id}`;
            } else {
                return `${this.parentApiUrl}/${id}/${lang}`;
            }
        }
    }

}

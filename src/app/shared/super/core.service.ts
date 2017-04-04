import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import * as config from '../app-globals';

export class CoreService {

    protected parentUrl: string = config.apiUrlPrefix;

    constructor(
        protected parentHttp: Http
    ) { }

    getRecords(): Observable<any[]> {
        return this.parentHttp
            .get(this.getUrl('get'), this.parentUrl)
            .map((response: Response) => response.json().data as any[]);
    }

    getRecord(id: any, lang: string = undefined): Observable<any> {
        return this.parentHttp
            .get(this.getUrl('find', id, lang))
            .map((response: Response) => response.json().data as any);
    }

    storeRecord(object: any) {
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const options   = new RequestOptions({ headers: headers });

        return this.parentHttp
            .post(this.getUrl('store'), object, options)
            .map(response => response.json());
    }

    updateRecord(object: any, id: any, lang: string = undefined) {
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const options   = new RequestOptions({ headers: headers });

        return this.parentHttp
            .put(this.getUrl('update', id, lang), object, options)
            .map(response => response.json());
    }

    deleteRecord(id: any, lang: string = undefined) {
        return this.parentHttp
            .delete(this.getUrl('delete', id, lang))
            .map(response => response.json());
    }

    protected getUrl(action: string, id: any = undefined, lang: string = undefined) {
        if (action === 'get') {
            if (lang === undefined) {   // check is object has language
                return `${this.parentUrl}`;
            } else {
                return `${this.parentUrl}/${lang}`;
            }
        }

        if (action === 'find') {
            if (lang === undefined) {   // check is object has language
                return `${this.parentUrl}/${id}`;
            } else {
                return `${this.parentUrl}/${id}/${lang}`;
            }
        }

        if (action === 'store') {
            return `${this.parentUrl}`;
        }

        if (action === 'search') {
            return `${this.parentUrl}/search`;
        }

        if (action === 'update') {
            if (lang === undefined) {   // check is object has language
                return `${this.parentUrl}/${id}`;
            } else {
                return `${this.parentUrl}/${id}/${lang}`;
            }
        }

        if (action === 'delete') {
            if (lang === undefined) {   // check is object has language
                return `${this.parentUrl}/${id}`;
            } else {
                return `${this.parentUrl}/${id}/${lang}`;
            }
        }
    }

}

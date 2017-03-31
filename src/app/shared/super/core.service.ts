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
            .get(this.parentUrl)
            .map((response: Response) => response.json().data as any[]);
    }

    getRecord(id: any): Observable<any> {
        return this.parentHttp
            .get(this.getUrl(id))
            .map((response: Response) => response.json().data as any);
    }

    getLangRecord(id: any, lang: string): Observable<any> {
        return this.parentHttp
            .get(this.getUrl(id, lang))
            .map((response: Response) => response.json().data as any);
    }

    storeRecord(object: any) {
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const options   = new RequestOptions({ headers: headers });

        return this.parentHttp
            .post(this.parentUrl, object, options)
            .map(response => response.json());
    }

    updateRecord(id: any, object: any) {
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const options   = new RequestOptions({ headers: headers });

        return this.parentHttp
            .put(this.getUrl(id), object, options)
            .map(response => response.json());
    }

    deleteRecord(id: any) {
        return this.parentHttp
            .delete(this.getUrl(id))
            .map(response => response.json());
    }

    private getUrl(id: any, lang?: string) {
        if(lang === undefined) {
            return `${this.parentUrl}/${id}`;
        }
        return `${this.parentUrl}/${id}/${lang}`;
    }

}

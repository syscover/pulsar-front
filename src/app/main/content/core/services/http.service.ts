import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { Core } from './../structures/core';
import { DataListResponse } from './../structures/data-list-response';
import * as _ from 'lodash';

@Injectable()
export class HttpService extends Core
{
    protected headers: HttpHeaders;
    protected options: Object;
    protected httpClient: HttpClient;
    protected apollo: Apollo;
    protected router: Router;
    private handleError = (err) => {
        console.log(err);
        if (err.status === 401) this.router.navigate(['/pulsar/login']); // redirect to login if token is invalid
       
        return Observable.throw('Error Observable.throw: ' + err.statusText);
    }

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

    apolloClient() 
    {
        return this.apollo;
    }

    /* proxyGet(action: string, params?: Params): Observable<any> 
    {
        return this.httpClient
            .get(this.getEndpoint(action, params), this.options)
            .catch(this.handleError);
    }

    proxyPost(action: string, object: any, params?: Params): Observable<any> 
    {
        return this.httpClient
            .post(this.getEndpoint(action, params), object, this.options)
            .catch(this.handleError);
    }

    proxyPut(action: string, object: any, params: Params): Observable<any> 
    {
        return this.httpClient
            .put(this.getEndpoint(action, params), object, this.options)
            .catch(this.handleError);
    }

    proxyDelete(action: string, params: Params): Observable<any> 
    {
        return this.httpClient
            .delete(this.getEndpoint(action, params))
            .catch(this.handleError);
    } */

   /*  searchRecords(object: any, params?: Params): Observable<DataListResponse> 
    {
        return this.proxyPost('search', object, params);
    }

    getRecords(params?: Params): Observable<DataListResponse> 
    {
        return this.proxyGet('get', params);
    }

    getRecord(params: Params): Observable<DataListResponse> 
    {
        return this.proxyGet('find', params);
    }

    storeRecord(object: any, params?: Params) 
    {
        return this.proxyPost('store', object, params);
    }

    updateRecord(object: any, params: Params) 
    {
        return this.proxyPut('put', object, params);
    }

    deleteRecord(params: Params) 
    {
        return this.proxyDelete('delete', params);
    } */

    protected setEndpoint(urlAddons: string) 
    {
        // set api URL
        this.apiUrl = this.apiUrl + urlAddons;
    }

    protected getEndpoint(action: string, params?: Params) 
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

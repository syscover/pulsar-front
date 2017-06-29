import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ApolloService } from './../../graphql/apollo-service';
import gql from 'graphql-tag';

import { PackageGraphQLService } from './../../../admin/package/package-graphql.service';
import { CoreService } from './../../../shared/super/core.service';

@Injectable()
export class ConfigService {

    graphqlUri: string;
    apiUrl: string;
    appPrefix: string;

    protected headers: Headers;
    protected options: RequestOptions;
    private config: Object = null;

    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        private apolloService: ApolloService,
        private packageGraphQLService: PackageGraphQLService
    ) {
          //  console.log(this.coreService);

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    public getValue(object: any) {
        return this.authHttp
            .post(`${this.apiUrl}/api/v1/admin/config/values`, object, this.options)
            .map((response: Response) => response.json());
    }

    /**
     * Load values form local file config.json, and load bootstrap variables from server
     */
    public load() {
        return new Promise((resolve, reject) => {

            /**
             * Start confign from local file
             * this operation is do it across http, for being a local file
             */
            let obs = this.http.get('./config.json')
                .map(res => res.json())
                .catch((error: any): any => {
                    console.log('Configuration file "config.json" could not be read, please create config.json file');
                    resolve(true);
                    return Observable.throw(error.json().error || 'Server error');
                }).subscribe( (response: Object) => {

                    // set global variables
                    this.graphqlUri = response['graphqlUri'];
                    this.apiUrl = response['apiUrl'];
                    this.appPrefix = response['appPrefix'];

                    /**
                     * Start config from server depending of environment
                     */
                    this.apolloService
                        .apollo(this.graphqlUri)
                        .watchQuery({
                            query: gql`
                                query CoreGetBootstapConfig {
                                    coreBootstrapConfig {
                                        base_lang
                                        langs {
                                            id
                                            name
                                            icon
                                            active
                                            sort
                                        }
                                    }
                                }`
                        })
                        .catch((error: any) => {
                            console.error('Error reading configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe(({data}) => {
                            this.config = data['coreBootstrapConfig'];
                            resolve(true);
                        });
                });
                // end config from loscal file
        });
    }
}

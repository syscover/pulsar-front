import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ApolloService } from './../../graphql/apollo.service';
import gql from 'graphql-tag';
import { CoreService } from './../../../shared/super/core.service';

@Injectable()
export class ConfigService {

    protected headers: Headers;
    protected options: RequestOptions;
    private config: Object = null;

    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        private apolloService: ApolloService
    ) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public get(key: any) {
        return this.config[key];
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
                }).subscribe( (config: Object) => {

                    this.config = config;

                    /**
                     * Start config from server depending of environment
                     */
                    this.apolloService
                        .apollo(this.get('graphqlUri'))
                        .watchQuery({
                            query: gql`
                                query CoreGetBootstrapConfig {
                                    coreBootstrapConfig {
                                        base_lang
                                        langs {
                                            id
                                            name
                                            icon
                                            active
                                            sort
                                        }
                                        packages {
                                            id
                                            name
                                            root
                                            active
                                            sort
                                        }
                                    }
                                }`
                        })
                        .subscribe(({data}) => {
                            // merge config from database with static config from config.json
                            this.config = Object.assign(this.config, data['coreBootstrapConfig']);
                            resolve(true);
                        },
                        (error: any) => {
                            console.error('Error to load coreBootstrapConfig query');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        });
                });
                // end config from loscal file
        });
    }
}

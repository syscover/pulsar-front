import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ApolloService } from './../../graphql/apollo.service';
import gql from 'graphql-tag';
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
        private apolloService: ApolloService
    ) {
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


                    this.http.get('./config.json')
                        .map(res => res.json())
                        .subscribe( (response: Object) => {
                    /**
                     * Start config from server depending of environment
                     */

                    this.apolloService
                        .apollo(this.graphqlUri)
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
                            this.config = data['coreBootstrapConfig'];
                            resolve(true);
                        });

                        /* this.config = {
                            base_lang: 'es',
                            langs: [
                                {id: 'es', name: 'Español', icon: 'es', active: true, sort: 1 },
                                {id: 'en', name: 'English', icon: 'gb', active: true, sort: 0 },
                            ],
                            packages: [
                                {id:1, name: 'Pulsar',root:'',active:true,sort:1},
                                {id:2, name:'Pulsar Administration Package',root:'admin',active:true,sort:2},
                                {id:9, name:'CRM Package',root:'crm',active:false,sort:9},
                                {id:12, name:'Market Package',root:'market',active:false,sort:12},
                                {id:13, name:'CMS Package',root:'cms',active:true,sort:13}
                            ]
                        };
                        resolve(true);*/

                    });

                        /*
                        TODO catch error
                        .catch((error: any) => {
                            console.error('Error reading configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        }); */
                });
                // end config from loscal file
        });
    }
}

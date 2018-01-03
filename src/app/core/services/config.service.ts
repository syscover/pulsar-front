import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';
import { GraphQLService } from './../graphql/graphql.service';

export function ConfigLoader(configService: ConfigService) {
    return () => configService.load();
}

@Injectable()
export class ConfigService {

    private config: Object = null;

    constructor(
        private http: HttpClient,
        private graphQl: GraphQLService
    ) {}

    /**
     * Use to get the data found in the second file (config file)
     */
    public get(key: any) {
        if (this.config) {
            return this.config[key];
        } else {
            return null;
        }
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
            this.http.get('./config.json')
                .catch((error: any): any => {
                    console.log('Configuration file "config.json" could not be read, please create config.json file');
                    resolve(true);
                    return Observable.throw(error.json().error || 'Server error');
                }).subscribe( (config: Object) => {
                    this.config = config;

                    // init apollo client
                    this.graphQl.createApolloClient(this.get('graphqlUri'));

                    /**
                     * Start config from server depending of environment
                     */
                    this.http
                        .get(this.config['apiUrl'] + '/api/v1/admin/config/bootstrap')
                        .subscribe((bootstrapConfig) => {
                            // merge config from database with static config from config.json
                            this.config = Object.assign(this.config, bootstrapConfig);
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

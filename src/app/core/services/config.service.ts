import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as appGlobals from './../../core/app-globals';

@Injectable()
export class ConfigService {

    protected headers: Headers;
    protected options: RequestOptions;
    private config: Object = null;
    private env:    Object = null;

    constructor(
        private http: Http
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

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        return this.env[key];
    }

    public getValue(object: any) {
        return this.http
            .post(`${appGlobals.apiUrlPrefix}/api/v1/admin/config/values`, object, this.options)
            .map((response: Response) => response.json());
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get(`${appGlobals.apiUrlPrefix}/api/v1/admin/config/env`).map( res => res.json() ).catch((error: any): any => {
                console.log('Configuration file "env.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe( (envResponse) => {
                this.env = envResponse;
                let request: any = null;

                switch (envResponse.env) {
                    case 'production': {
                        request = this.http.get(`${appGlobals.apiUrlPrefix}/api/v1/admin/config/bootstrap/${envResponse.env }`);
                    } break;

                    case 'development': {
                        request = this.http.get(`${appGlobals.apiUrlPrefix}/api/v1/admin/config/bootstrap/${envResponse.env }`);
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }

                if (request) {
                    request
                        .map( res => res.json() )
                        .catch((error: any) => {
                            console.error('Error reading ' + envResponse.env + ' configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });

        });
    }
}

import { Inject, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigService {

    apiUrl: string;
    appPrefix: string;

    protected headers: Headers;
    protected options: RequestOptions;
    private config: Object = null;
    private env:    Object = null;

    constructor(
        private http: Http,
        private authHttp: AuthHttp
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
        return this.authHttp
            .post(`${this.apiUrl}/api/v1/admin/config/values`, object, this.options)
            .map((response: Response) => response.json());
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {

            /**
             * Start confign from local file
             */
            let obs = this.http.get('./config.json')
                .map(res => res.json())
                .catch((error: any): any => {
                    console.log('Configuration file "config.json" could not be read, please create config.json file');
                    resolve(true);
                    return Observable.throw(error.json().error || 'Server error');
                }).subscribe( (response: Object) => {

                    // set global variables
                    this.apiUrl = response['apiUrl'];
                    this.appPrefix = response['appPrefix'];

                    /**
                     * Start config from server depending of environment
                     */
                    this.http.get(`${this.apiUrl}/api/v1/admin/config/bootstrap`)
                        .map(res => res.json())
                        .catch((error: any) => {
                            console.error('Error reading configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this.config = responseData;
                            resolve(true);
                        });
                });
                // end config from loscal file
        });
    }
}

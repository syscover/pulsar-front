import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { ApolloService } from './apollo.service';

@Injectable()
export class BootstrapService {
    constructor(
        private _httpClient: HttpClient,
        private _configService: ConfigService,
        private _apolloService: ApolloService
    ) { }

    public load(): Promise<Object>
    {
        // load values form local file config.json and load bootstrap variables from server
        return new Promise((resolve, reject) => {

            // start config from local file, this operation is do it across http, for being a local file
            this
                ._httpClient
                .get('./config/config.json')
                .subscribe(
                    (config: object) => {
                        // init apollo client
                        this._apolloService.createApolloClient(config['graphqlUri']);

                        // start config from server depending of environment
                        this._httpClient
                            .get(config['apiUrl'] + '/api/v1/admin/config/bootstrap')
                            .subscribe((bootstrapConfig) => {
                                // merge config from database with static config from config.json
                                // init config service
                                this._configService.set(Object.assign(config, bootstrapConfig));
                                resolve(true);
                            },
                            (error: any) => {
                                console.error('Error to load coreBootstrapConfig query');
                                resolve(error);
                                return Observable.throw(error.json().error || 'Server error');
                            });
                    },
                    (error: any): any => {
                        console.log(error);
                        console.error('Configuration file "config.json" could not be read, please create config.json file');
                        resolve(true);
                        return Observable.throw(error.json().error || 'Server error');
                    }
                );
        });
    }
}

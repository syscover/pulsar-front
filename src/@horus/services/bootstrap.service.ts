import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApolloService } from '@horus/services/apollo.service';
import { ConfigService } from '@horus/services/config.service';
import { throwError } from 'rxjs';

@Injectable()
export class BootstrapService
{
    constructor(
        private _httpClient: HttpClient,
        private _configService: ConfigService,
        private _apolloService: ApolloService
    ) {}

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

                        this.createApolloClient(config['graphQLUrl']);

                        // start config from server depending of environment
                        this._httpClient
                            .get(config['restUrl'] + '/api/v1/admin/config/bootstrap')
                            .subscribe((bootstrapConfig) => {
                                // merge config from database with static config from config.json
                                // init config service
                                this._configService.set(Object.assign({}, config, bootstrapConfig['data']));
                                resolve(true);
                            },
                            (error: any) => {
                                console.error('Error to load coreBootstrapConfig query');
                                resolve(error);
                                return throwError(error.json().error || 'Server error');
                            });
                    },
                    (error: any): any => {
                        console.log(error);
                        console.error('Configuration file "config.json" could not be read, please create config.json file');
                        resolve(true);

                        return throwError(error.json().error || 'Server error');
                    }
                );
        });
    }

    // create apollo client
    private createApolloClient(config): void
    {
        this._apolloService.createApolloClient(config);
    }
}

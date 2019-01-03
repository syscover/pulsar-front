import { Injector } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { environment } from 'environments/environment';

export abstract class Core
{
    configService: ConfigService;
    graphqlUri: string;
    apiUrl: string;
    env: any = environment;

    constructor(
        protected injector: Injector
    ) {
        this.configService = injector.get(ConfigService);

        // set properties 
        this.graphqlUri = this.configService.get('graphqlUri');
        this.apiUrl = this.configService.get('apiUrl');
    }
}

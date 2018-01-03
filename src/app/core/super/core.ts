import { Injector } from '@angular/core';
import { ConfigService } from './../../core/services/config.service';

export class Core {

    protected configService: ConfigService;
    graphqlUri: string;
    appPrefix: string;
    apiUrl: string;

    constructor(
        protected injector: Injector
    ) {
        this.configService = injector.get(ConfigService);

        // I need to create a bind because the configuration service is instantiated asynchronously
        this.graphqlUri = this.configService.get('graphqlUri');
        this.appPrefix = this.configService.get('appPrefix');
        this.apiUrl = this.configService.get('apiUrl');
    }
}

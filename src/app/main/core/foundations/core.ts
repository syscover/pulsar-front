import { Injector } from '@angular/core';
import { ConfigService } from '@horus/services/config.service';
import { environment } from 'environments/environment';

export abstract class Core
{
    configService: ConfigService;
    graphQLUrl: string;
    restUrl: string;
    env: any = environment;

    protected constructor(
        protected injector: Injector
    ) {
        this.configService = injector.get(ConfigService);

        // set properties 
        this.graphQLUrl = this.configService.get('graphQLUrl');
        this.restUrl = this.configService.get('restUrl');
    }
}

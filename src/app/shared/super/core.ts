import { Injector } from '@angular/core';
import { ConfigService } from './../../core/services/config/config.service';

export class Core {

    protected configService: ConfigService;
    appRootPrefix: string;
    apiUrlPrefix: string;

    constructor(
        protected injector: Injector
    ) {
        this.configService = injector.get(ConfigService);
        this.appRootPrefix = this.configService.appRootPrefix;
        this.apiUrlPrefix = this.configService.apiUrlPrefix;
    }
}

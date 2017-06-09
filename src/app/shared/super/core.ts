import { Injector } from '@angular/core';
import { ConfigService } from './../../core/services/config/config.service';

export class Core {

    protected configService: ConfigService;
    appPrefix: string;
    apiUrl: string;

    constructor(
        protected injector: Injector
    ) {
        this.configService = injector.get(ConfigService);
        this.appPrefix = this.configService.appPrefix;
        this.apiUrl = this.configService.apiUrl;
    }
}

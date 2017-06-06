import { Injector } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Core } from './core';
import { ConfigService } from './../../core/services/config.service';
import { CoreService } from './core.service';

import { Lang } from './../../admin/admin.models';

export class CoreComponent extends Core {

    protected router: Router;
    protected route: ActivatedRoute;
    protected params: Params;
    protected langs: Lang[]; // Activated application lang

    // services superclass
    protected configService: ConfigService;
    protected objectService: CoreService;

    constructor(
        protected injector: Injector
    ) {
        super();

        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.configService = injector.get(ConfigService);

        // set object properties
        this.params = this.route.snapshot.params;
        this.langs = this.configService.getConfig('langs');
    }
}

import { Injector } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

import { Core } from './core';
import { CoreService } from './core.service';

import { Lang } from './../../admin/admin.models';

export class CoreComponent extends Core {

    protected router: Router;
    protected route: ActivatedRoute;
    protected params: Params;
    protected langs: Lang[]; // Activated application lang
    protected objectService: CoreService;
    protected confirmationService: ConfirmationService;

    // baseUri to set component urls in templete, this property must to be public because is used in template
    baseUri: string;
    baseLang: string;

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.router = injector.get(Router);
        this.route = injector.get(ActivatedRoute);
        this.confirmationService = injector.get(ConfirmationService);

        // set object properties
        this.params = this.route.snapshot.params;
        this.langs = this.configService.getConfig('langs');
        this.baseLang = this.configService.getConfig('base_lang');
    }
}

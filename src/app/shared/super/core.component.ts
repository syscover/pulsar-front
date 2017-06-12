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
    protected confirmationService: ConfirmationService;

    // baseUri to set component urls in templete, this property must to be public because is used in template
    baseUri: string;
    // base languague of application, this variable is required for multi-language objects
    baseLang: string;

    // path of package and resource
    packagePath: string;
    resourcePath: string;

    constructor(
        protected injector: Injector,
        protected objectService: CoreService
    ) {
        super(injector);

        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.confirmationService = this.injector.get(ConfirmationService);

        // set object properties
        this.setBaseUri();
        this.params = this.route.snapshot.params;
        this.langs = this.configService.getConfig('langs');
        this.baseLang = this.configService.getConfig('base_lang');
    }

    protected setBaseUri(baseUri: string = undefined) {
        // compose baseUri from snapshot route if baseUri parameter is undefined
        if (! baseUri) {
            if (this.route.snapshot.url) {
                this.packagePath = this.route.snapshot.root.firstChild.firstChild.url[0].path;
                this.resourcePath = this.route.snapshot.url[0].path;

                this.baseUri = '/' + this.appPrefix + '/' + this.route.snapshot.root.firstChild.firstChild.url[0].path + '/' + this.resourcePath;
            }
        } else {
            this.baseUri = baseUri;
        }
    }
}

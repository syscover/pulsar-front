import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ResourceService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appPrefix}/admin/resource`); // set application URL
        this.setEndpoint('/api/v1/admin/resource'); // set api URL
    }
}

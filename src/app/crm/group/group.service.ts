import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class GroupService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appPrefix}/crm/group`); // set application URL
        this.setEndpoint('/api/v1/crm/group'); // set api URL
    }
}

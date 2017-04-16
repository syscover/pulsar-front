import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class GroupService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/crm/groups`); // set application URL
        this.setApiUrl('/api/v1/crm/groups'); // set api URL
    }
}

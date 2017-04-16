import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ActionService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri('/pulsar/admin/actions'); // set application URL
        this.setApiUrl('/api/v1/admin/actions'); // set api URL
    }
}

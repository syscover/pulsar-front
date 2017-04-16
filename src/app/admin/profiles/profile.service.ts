import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ProfileService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/admin/profiles`); // set application URL
        this.setApiUrl('/api/v1/admin/profiles'); // set api URL
    }
}

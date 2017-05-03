import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class PackageService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/admin/package`); // set application URL
        this.setApiUrl('/api/v1/admin/package'); // set api URL
    }
}

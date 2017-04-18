import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class CustomerClassService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/market/customer/class`); // set application URL
        this.setApiUrl('/api/v1/market/customer/class'); // set api URL
    }
}

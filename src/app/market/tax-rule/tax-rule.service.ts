import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class TaxRuleService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/market/tax-rule`); // set application URL
        this.setApiUrl('/api/v1/market/tax-rule'); // set api URL
    }
}

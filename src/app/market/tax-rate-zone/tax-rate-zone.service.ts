import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class TaxRateZoneService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/market/tax-rate-zone`); // set application URL
        this.setApiUrl('/api/v1/market/tax-rate-zone'); // set api URL
    }
}

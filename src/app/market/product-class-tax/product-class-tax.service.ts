import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ProductClassTaxService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/market/product-class-tax`); // set application URL
        this.setApiUrl('/api/v1/market/product-class-tax'); // set api URL
    }
}

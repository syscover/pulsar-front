import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class CustomerClassTaxService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appPrefix}/market/customer-class-tax`); // set application URL
        this.setEndpoint('/api/v1/market/customer-class-tax'); // set api URL
    }
}

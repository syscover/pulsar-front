import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class PaymentMethodService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/market/payment-method`); // set application URL
        this.setApiUrl('/api/v1/market/payment-method'); // set api URL
    }
}

import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class OrderStatusService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/market/order-status`); // set application URL
        this.setApiUrl('/api/v1/market/order-status'); // set api URL
    }
}

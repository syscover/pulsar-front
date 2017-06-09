import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ProfileService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appPrefix}/admin/profile`); // set application URL
        this.setEndpoint('/api/v1/admin/profile'); // set api URL
    }
}

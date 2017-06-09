import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ActionService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appPrefix}/admin/action`); // set application URL
        this.setEndpoint('/api/v1/admin/action'); // set api URL
    }
}

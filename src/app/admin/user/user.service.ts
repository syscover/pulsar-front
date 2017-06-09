import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class UserService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appPrefix}/admin/user`); // set application URL
        this.setEndpoint('/api/v1/admin/user'); // set api URL
    }
}

import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class FieldService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appPrefix}/admin/field`); // set application URL
        this.setEndpoint('/api/v1/admin/field'); // set api URL
    }
}

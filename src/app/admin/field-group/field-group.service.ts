import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class FieldGroupService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appPrefix}/admin/field-group`); // set application URL
        this.setEndpoint('/api/v1/admin/field-group'); // set api URL
    }
}

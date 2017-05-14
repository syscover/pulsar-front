import { Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class FieldValueService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/admin/field-value`); // set application URL
        this.setApiUrl('/api/v1/admin/field-value'); // set api URL
    }
}

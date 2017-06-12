import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class FieldValueService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);
        this.setEndpoint('/api/v1/admin/field-value'); // set api URL
    }
}

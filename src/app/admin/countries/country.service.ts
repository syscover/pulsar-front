import { Injectable, Injector } from '@angular/core';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class CountryService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/admin/countries`); // set application URL
        this.setApiUrl('/api/v1/admin/countries'); // set api URL
    }
}
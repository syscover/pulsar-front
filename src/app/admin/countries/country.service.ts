import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class CountryService extends CoreService {

    constructor(
        private http: Http,
    ) {
        super(
            http
        );
        this.setBaseUri('/pulsar/admin/countries');
        this.setApiUrl('/api/v1/admin/countries');
    }
}
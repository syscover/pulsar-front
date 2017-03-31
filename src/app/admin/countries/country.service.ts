import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class CountryService extends CoreService {

    public baseUri = '/pulsar/admin/countries';

    constructor(
        private http: Http
    ) {
        super(
            http
        );
        this.parentUrl = this.parentUrl + '/api/v1/countries'; // set api URL
    }
}
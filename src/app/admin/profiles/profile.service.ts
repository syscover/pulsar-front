import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ProfileService extends CoreService {

    public baseUri = '/pulsar/admin/profiles';

    constructor(
        http: Http
    ) {
        super(
            http
        );
        this.parentUrl = this.parentUrl + '/api/v1/profiles'; // set api URL
    }
}

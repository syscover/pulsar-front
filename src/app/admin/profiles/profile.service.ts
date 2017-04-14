import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ProfileService extends CoreService {

    constructor(
        public http: Http
    ) {
        super(
            http
        )

        this.setBaseUri('/pulsar/admin/profiles'); // set application URL
        this.setApiUrl('/api/v1/admin/profiles'); // set api URL
    }
}

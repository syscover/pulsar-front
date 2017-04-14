import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ProfileService extends CoreService {

    constructor(
        http: Http
    ) {
        super(
            http
        );
        this.setBaseUri('/pulsar/admin/profiles');
        this.setApiUrl('/api/v1/admin/profiles'); // set api URL
    }
}

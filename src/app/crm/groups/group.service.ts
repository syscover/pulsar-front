import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class GroupService extends CoreService {

    constructor(
        private http: Http
    ) {
        super(
            http
        );
        this.setBaseUri('/pulsar/crm/groups');
        this.setApiUrl('/api/v1/crm/groups'); // set api URL
    }
}

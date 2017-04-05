import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ActionService extends CoreService {

    constructor(
        private http: Http
    ) {
        super(
            http
        );
        this.setBaseUri('/pulsar/admin/actions');
        this.setApiUrl('/api/v1/admin/actions'); // set api URL
    }
}

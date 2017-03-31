import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class ActionService extends CoreService {

    public baseUri = '/pulsar/admin/actions';

    constructor(
        private http: Http
    ) {
        super(
            http
        );
        this.parentUrl = this.parentUrl + '/api/v1/actions'; // set api URL
    }
}

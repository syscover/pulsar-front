import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class LangService extends CoreService {

    public baseUri = '/pulsar/admin/langs';

    constructor(
        http: Http
    ) {
        super(
            http
        );
        this.parentUrl = this.parentUrl + '/api/v1/admin/langs'; // set api URL
    }
}

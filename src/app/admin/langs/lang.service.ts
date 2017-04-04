import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

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

    getActivatedLangs(): Observable<any[]> {
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const options   = new RequestOptions({ headers: headers });

        // build query
        const object = {
            'type': 'query',
            'parameters': [
                {
                    'command': 'where',
                    'field': 'active',
                    'operator': '=',
                    'value': true
                }
            ]
        };

        return this.parentHttp
            .post(this.getUrl('search'), object, options)
            .map((response: Response) => response.json().data);
    }
}

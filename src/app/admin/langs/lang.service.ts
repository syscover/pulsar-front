import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class LangService extends CoreService {

    constructor(
        http: Http
    ) {
        super(
            http
        );
        this.setBaseUri('/pulsar/admin/langs');
        this.setApiUrl('/api/v1/admin/langs');
    }

    getActivatedLangs(): Observable<any[]> {
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
            .post(this.getApiUrl('search'), object, this.options)
            .map((response: Response) => response.json().data);
    }
}

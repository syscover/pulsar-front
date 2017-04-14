import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { JsonResponse } from './../../shared/classes/json-respose';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class LangService extends CoreService {

    constructor(
        public http: Http
    ) {
        super(
            http
        )

        this.setBaseUri('/pulsar/admin/langs'); // set application URL
        this.setApiUrl('/api/v1/admin/langs'); // set api URL
    }

    getActivatedLangs(): Observable<JsonResponse> {
        // build query
        const object = {
            'type': 'query',
            'parameters': [
                {
                    'command': 'where',
                    'column': 'active',
                    'operator': '=',
                    'value': true
                }
            ]
        };

        return this.http
            .post(this.getApiUrl('search'), object, this.options)
            .map((response: Response) => response.json());
    }
}

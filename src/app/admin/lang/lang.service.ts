import { Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { JsonResponse } from './../../shared/classes/json-respose';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class LangService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/admin/lang`); // set application URL
        this.setApiUrl('/api/v1/admin/lang'); // set api URL
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

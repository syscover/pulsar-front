import { Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { JsonResponse } from './../../../classes/json-respose';
import { CoreService } from './../../../super/core.service';

@Injectable()
export class AttachmentService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);

        this.setBaseUri(`/${this.appRootPrefix}/admin/attachment-upload`); // set application URL
        this.setApiUrl('/api/v1/admin/attachment-upload'); // set api URL
    }

    setCropImage(parameters): Observable<any> {
        return this.http
            .post(this.getApiUrl('crop', ['crop']), {
                'type': 'crop',
                'parameters': parameters
            }, this.options)
            .map((response: Response) => response.json());
    }
}

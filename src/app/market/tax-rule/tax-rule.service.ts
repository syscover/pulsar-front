import { Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { JsonResponse } from './../../shared/classes/json-respose';
import { CoreService } from './../../shared/super/core.service';

@Injectable()
export class TaxRuleService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);
        this.setEndpoint('/api/v1/market/tax-rule'); // set api URL
    }

    getProductTaxes(object: any): Observable<JsonResponse> {
        return this.authHttp
            .post(`${this.apiUrl}/product-taxes`, object, this.options)
            .map((response: Response) => response.json());
    }
}

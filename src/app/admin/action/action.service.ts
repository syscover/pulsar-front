import { Injectable, Injector } from '@angular/core';
import { CoreService } from './../../shared/super/core.service';
import { ApolloClient, createNetworkInterface } from 'apollo-client';

@Injectable()
export class ActionService extends CoreService {

    constructor(
        protected injector: Injector
    ) {
        super(injector);
        this.setEndpoint('/api/v1/admin/action'); // set endpoint api URL
    }
}

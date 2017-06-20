import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloClientManager } from './apollo-client-manager';

@Injectable()
export class ApolloService {

    _apollo: Apollo;

    constructor() { }

    apollo(uri) {
        if (uri) {
            this._apollo = ApolloClientManager.apollo(uri);
        } else if (! this._apollo) {
            this._apollo = ApolloClientManager.apollo();
        }
        return this._apollo;
    }
}

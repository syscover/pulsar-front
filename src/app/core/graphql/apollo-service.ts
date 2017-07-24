import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloClientManager } from './apollo-client-manager';

@Injectable()
export class ApolloService {

    _apollo: Apollo;
    _uri: string;

    constructor() { }

    apollo(uri) {
        if (! this._apollo || uri !== this._uri) {
            this._uri = uri;
            this._apollo = ApolloClientManager.apollo(
                this._uri
            );
        }
        return this._apollo;
    }
}

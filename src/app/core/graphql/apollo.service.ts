import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloClientManagerService } from './apollo-client-manager.service';

@Injectable()
export class ApolloService {

    _apollo: Apollo;
    _uri: string;

    constructor(
        private apolloClientManagerService: ApolloClientManagerService
    ) { }

    apollo(uri) {
        if (! this._apollo || uri !== this._uri) {
            this._uri = uri;
            this._apollo = this.apolloClientManagerService.apollo(this._uri);
        }
        return this._apollo;
    }
}

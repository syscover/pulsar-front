import { Http, ConnectionBackend } from '@angular/http';
import { ClientMap } from 'apollo-angular/build/src/types';
import { Inject, Injectable, ReflectiveInjector } from '@angular/core';
import { ApolloClient, createNetworkInterface, NetworkInterface } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import { HTTPNetworkInterface } from 'apollo-client/transport/networkInterface';

import { ConfigService } from './../services/config/config.service';


@Injectable()
export class ApolloClientManager {
    private client: ApolloClient;
    private networkInterface: HTTPNetworkInterface;

    static getClient(uri: string = undefined): ApolloClient {
        const cm = new ApolloClientManager(uri);
        return cm.client;
    }

    static getClientMap(uri: string = undefined): ClientMap {
        let client = ApolloClientManager.getClient(uri);

        return { 'default' : client };
    }

    static apollo(uri: string = undefined): Apollo {
        return new Apollo(ApolloClientManager.getClientMap(uri));
    }

    constructor(
        uri: string = undefined
    ) {
        const networkInterface = createNetworkInterface({
            uri: uri ? uri : 'http://api.pulsar.local/graphql'
        });

        networkInterface.use([{
            applyMiddleware(req, next) {
                if (!req.options.headers) {
                    req.options.headers = {};  // Create the header object if needed.
                }
                // get the authentication token from local storage if it exists
                req.options.headers.authorization = localStorage.getItem('token') || null;
                next();
            }
        }]);

        this.client = new ApolloClient({
            networkInterface
        });
    }
}

import { ClientMap } from 'apollo-angular/build/src/types';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Apollo } from 'apollo-angular';

export class ApolloClientManager {
    private client: ApolloClient;

    static getClient(uri: string = undefined): ApolloClient {
        const cm = new ApolloClientManager(uri);
        return cm.client;
    }

    static getClientMap(uri: string = undefined): ClientMap {
        return { 'default' : ApolloClientManager.getClient(uri) };
    }

    static apollo(uri: string = undefined): Apollo {
        return new Apollo(ApolloClientManager.getClientMap(uri));
    }

    constructor(
        uri: string = undefined
    ) {
        const networkInterface = createNetworkInterface({
            uri: uri ? uri : '/graphql'
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

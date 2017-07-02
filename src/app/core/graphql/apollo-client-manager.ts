import { ClientMap } from 'apollo-angular/build/src/types';
import { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher } from 'apollo-client';
import { Apollo } from 'apollo-angular';

export class ApolloClientManager {
    private client: ApolloClient;

    static getClient(uri: string = undefined): ApolloClient {
        const cm = new ApolloClientManager(uri);
        return cm.client;
    }

    static getClientMap(uri: string = undefined): ClientMap {
        return { default : ApolloClientManager.getClient(uri) };
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

        const fragmentMatcher = new IntrospectionFragmentMatcher({
            introspectionQueryResultData: {
                __schema: {
                    types: [
                        {
                            kind: "INTERFACE", // put your own INTERFACE and UNION types here!
                            name: "CoreObjectInterface",
                            possibleTypes: [
                                { name: "AdminPackage" },
                                { name: "AdminCountry" },
                                { name: "AdminLang" },
                                { name: "AdminAction" },
                                { name: "AdminResource" },
                                { name: "AdminProfile" },
                                { name: "AdminAttachmentFamily" },
                                { name: "AdminFieldGroup" },
                                { name: "CmsSection" },
                                { name: "CmsFamily" },
                                { name: "CmsCategory" },
                                { name: "CmsArticle" },
                            ]
                        }
                    ]
                }
            }
        });

        this.client = new ApolloClient({
            networkInterface,
            fragmentMatcher,
            dataIdFromObject: o => {
                if (o['lang_id'] && o['id']) {
                    return `${o['__typename']}-${o['id']}-${o['lang_id']}`;
                } else if(o['id']) {
                    return `${o['__typename']}-${o['id']}`;
                } else {
                    return `${o['__typename']}`;
                }
            }
        });
    }
}

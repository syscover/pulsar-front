import { Injectable, Injector } from '@angular/core';
import { ClientMap } from 'apollo-angular/build/src/types';
import { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher, HTTPFetchNetworkInterface } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import { environment } from './../../../environments/environment';

@Injectable()
export class ApolloClientManagerService {

    apollo(uri: string = undefined): Apollo {
        return new Apollo({ default : this.createApolloClient(uri) });
    }

    createApolloClient(uri: string = undefined): ApolloClient {
        const networkInterface = createNetworkInterface({
            uri: uri ? uri : '/graphql'
        });

        // middleware to send request
        networkInterface.use([{
            applyMiddleware(request, next) {
                if (! request.options.headers) {
                    request.options.headers = {};  // Create the header object if needed.
                }
                // get the authentication token from local storage if it exists
                request.options.headers.authorization = `Bearer ${localStorage.getItem('token')}` || null;
                next();
            }
        }]);

        // middleware to get response
        networkInterface.useAfter([{
            applyAfterware({ response }, next) {
                let authorization = response.headers.get('Authorization');

                // if (environment.debug) console.log('DEBUG - Token authorization from Apollo response: ', response);

                if (authorization) {
                    // segment string to avoid Bearer word, the header has this format 'Bearer eyJ0eXAiOiJKV1QiLCJh...'
                    let token = authorization.split(' ');
                    localStorage.setItem('token', token[1]);
                }

                if (response.status === 401 || ! authorization) {
                    if (environment.debug) console.log('DEBUG - Apollo response: ', response.status);
                }
                next();
            }
        }]);

        // doesn't include fragmentMatcher in apollo cliente because CoreObjectInterface is unused
        /* const fragmentMatcher = new IntrospectionFragmentMatcher({
            introspectionQueryResultData: {
                __schema: {
                    types: [
                        {
                            kind: "INTERFACE", // put your own INTERFACE and UNION types here!
                            name: "CoreObjectInterface",
                            possibleTypes: [
                                { name: "AdminPackage" },
                                { name: "AdminCountry" },
                                ...
                            ]
                        }
                    ]
                }
            }
        }); */

        return new ApolloClient({
            networkInterface,
            //fragmentMatcher,
            dataIdFromObject: o => {

                function guid() {
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                    }
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                }

                let trackId = false;

                if (o['lang_id'] && o['id']) {
                    if (trackId) console.log('Apollo ID: ', `${o['__typename']}-${o['id']}-${o['lang_id']}`);
                    return `${o['__typename']}-${o['id']}-${o['lang_id']}`;
                } else if (o['id']) {
                    if (
                        o['__typename'] === 'CoreTranslationField' ||
                        o['__typename'] === 'CoreConfigOptionType'
                    ) {
                        const id = guid();
                        if (trackId) console.log(`Apollo ID for type ${o['__typename']}:`, id);
                        return id;
                    }
                    if (trackId) console.log(`Apollo ID for type ${o['__typename']}:`, o['id']);
                    return `${o['__typename']}-${o['id']}`;
                } else {
                    const id = guid();
                    if (trackId) console.log(`Apollo ID for type ${o['__typename']}:`, id);

                    return id;
                }
            }
            //dataIdFromObject: () => undefined, // to delete id object response
        });
    }
}

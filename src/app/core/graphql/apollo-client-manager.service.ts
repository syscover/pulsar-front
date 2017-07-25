import { Injectable } from '@angular/core';
import { ClientMap } from 'apollo-angular/build/src/types';
import { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher, HTTPFetchNetworkInterface } from 'apollo-client';
import { environment } from './../../../environments/environment';
import { Apollo } from 'apollo-angular';

//import { ConfigService } from './../services/config/config.service';

@Injectable()
export class ApolloClientManagerService {

    constructor(
       // public configService: ConfigService
    ) { }

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

                if (environment.debug) console.log('DEBUG - Token authorization from Apollo response: ', response);

                if (authorization) {
                    // segment string to avoid Bearer word, the header has this format 'Bearer eyJ0eXAiOiJKV1QiLCJh...'
                    let token = authorization.split(' ');
                    localStorage.setItem('token', token[1]);
                }

                if (response.status === 401) {
                    //this.router.navigate([`/${this.configService.appPrefix}/logout`]);
                }
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
                                { name: "AdminAttachmentMime" },
                                { name: "AdminAttachmentFamily" },
                                { name: "AdminFieldGroup" },
                                { name: "AdminField" },
                                { name: "AdminFieldValue" },
                                { name: "AdminUser" },
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

        return new ApolloClient({
            networkInterface,
            fragmentMatcher,
            //dataIdFromObject: () => undefined, // to delete id object response
            dataIdFromObject: o => {
                if (o['lang_id'] && o['id']) {
                    return `${o['__typename']}-${o['id']}-${o['lang_id']}`;
                } else if (o['id']) {
                    if (
                        o['__typename'] === 'CoreTranslationField' ||
                        o['__typename'] === 'CoreConfigOptionType'
                    ) {
                        return undefined;
                    }
                    return `${o['__typename']}-${o['id']}`;
                } else {
                    return `${o['__typename']}`;
                }
            }
        });
    }
}

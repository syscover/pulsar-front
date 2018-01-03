import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@Injectable()
export class GraphQLService {

    constructor(
        private apollo: Apollo,
        private httpLink: HttpLink
    ) { }

    createApolloClient(graphqlUri: string) {

        // id cache policy
        const cache = new InMemoryCache({
            dataIdFromObject: (o) => {
                function guid() {
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                    }
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                }

                const trackId = false;

                if (o['__typename'] === 'CoreTranslationField' || o['__typename'] === 'CoreConfigOption') {
                    const uid = guid();
                    if (trackId) console.log(`Apollo ID for type ${o['__typename']}:`, uid);
                    return uid;
                }

                if (o['ix']) {
                    if (trackId) console.log(`Apollo ID for type ${o['__typename']}:`, `${o['__typename']}-${o['ix']}`);
                    return `${o['__typename']}-${o['ix']}`;
                }

                if (o['id']) {
                    if (trackId) console.log(`Apollo ID for type ${o['__typename']}:`, `${o['__typename']}-${o['id']}`);
                    return `${o['__typename']}-${o['id']}`;
                }

                if (o['key']) {
                    if (trackId) console.log(`Apollo ID for type ${o['__typename']}:`, `${o['__typename']}-${o['key']}`);
                    return `${o['__typename']}-${o['key']}`;
                }

                const id = guid();
                if (trackId) console.log(`Apollo ID for type ${o['__typename']}:`, id);

                return id;
            }
        });

        this.apollo.create({
            link: this.httpLink.create({ uri: graphqlUri }),
            cache: cache,
        });
    }
}

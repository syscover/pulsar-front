import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { horusConfig } from 'app/horus-config';
import { environment } from 'environments/environment';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

// graphQL mock schema
import resolvers from '@horus/mocks/resolvers.graphql';
import globalScalars from '@horus/mocks/scalars.graphql';
import globalTypes from '@horus/mocks/types.graphql';
import schemaTypes from 'app/main/core/mocks/schema.type.graphql';
import schemaQueries from 'app/main/core/mocks/schema.query.graphql';
import mockTypes from 'app/main/core/mocks/mock.type';
import mockQueries from 'app/main/core/mocks/mock.query';

@Injectable()
export class ApolloService 
{
    private _horusConfig = horusConfig;
    private _env: any = environment;

    constructor(
        private apollo: Apollo,
        private httpLink: HttpLink
    ) {}

    createApolloClient(graphQLUrl: string): void
    {
        let options;

        if (this._horusConfig.graphQLMock)
        {
            const schemaDefinition = `
                ${globalScalars}
                ${globalTypes}
            
                ${schemaTypes}
                
                type Query {
                    ${schemaQueries}
                }
                
                schema {
                    query: Query
                }
            `;

            const schema = makeExecutableSchema({ typeDefs: schemaDefinition, resolvers: resolvers, resolverValidationOptions: {requireResolversForResolveType: false}});

            // create mocks joining mocks source
            const mocks = Object.assign({}, {Query: () => (mockQueries)}, mockTypes);

            // Add mocks, modifies schema in place
            addMockFunctionsToSchema({ schema, mocks });

            options = {
                link: new SchemaLink({ schema }),
                cache: new InMemoryCache()
            };

            if (this._env.debug) console.log('DEBUG - Apollo in mode mock with options: ', options);
        }
        else
        {
            // id cache policy
            const cache = new InMemoryCache({
                dataIdFromObject: (o: any) => {

                    function guid(): string
                    {
                        function s4(): string
                        {
                            return Math.floor((1 + Math.random()) * 0x10000)
                                .toString(16)
                                .substring(1);
                        }
                        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                    }

                    const trackId = false;

                    // include especial types that require create a uid
                    if (
                        o.__typename === 'CoreTranslationField' // ||
                    // o.__typename === 'CoreConfigOption' // Type deleted
                    )
                    {
                        const uid = guid();
                        if (trackId) console.log(`Apollo ID for type ${o.__typename}:`, uid);
                        return uid;
                    }

                    if (o['ix'])
                    {
                        if (trackId) console.log(`Apollo ID for type ${o.__typename}:`, `${o.__typename}-${o['ix']}`);
                        return `${o.__typename}-${o['ix']}`;
                    }

                    if (o['id'])
                    {
                        if (trackId) console.log(`Apollo ID for type ${o.__typename}:`, `${o.__typename}-${o['id']}`);
                        return `${o.__typename}-${o['id']}`;
                    }

                    if (o['key'])
                    {
                        if (trackId) console.log(`Apollo ID for type ${o.__typename}:`, `${o.__typename}-${o['key']}`);
                        return `${o.__typename}-${o['key']}`;
                    }

                    const id = guid();
                    if (trackId) console.log(`Apollo ID for type ${o.__typename}:`, id);

                    return id;
                }
            });

            options = {
                link: this.httpLink.create({ uri: graphQLUrl }),
                cache: cache,
                defaultOptions: {
                    watchQuery: {
                        fetchPolicy: 'network-only',
                        errorPolicy: 'all'
                    },
                    query: {
                        fetchPolicy: 'network-only',
                        errorPolicy: 'all'
                    },
                    mutate: {
                        errorPolicy: 'all'
                    }
                }
            };

            if (this._env.debug) console.log('DEBUG - Apollo in mode real with options: ', options);
        }

        this
            .apollo
            .create(options);
    }
}

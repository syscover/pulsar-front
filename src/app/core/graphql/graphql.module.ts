import { ApolloService } from './apollo-service';
import { NgModule, Inject } from '@angular/core';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { ApolloClientManager } from './apollo-client-manager';

@NgModule({
    imports: [
        ApolloModule.forRoot(ApolloClientManager.getClient)
    ],
    exports: [ApolloModule],
    providers: [
        ApolloService
    ]
})
export class GraphQLModule { }

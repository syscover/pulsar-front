import { ConfigService } from './../services/config/config.service';
import { NgModule, Inject } from '@angular/core';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { ApolloClientManagerService } from './apollo-client-manager.service';
import { ApolloService } from './apollo.service';

@NgModule({
    imports: [
        //ApolloModule.forRoot(ApolloClientManager.getClient)
        ApolloModule
    ],
    exports: [
        ApolloModule
    ],
    providers: [
        ApolloClientManagerService,
        ApolloService
    ]
})
export class GraphQLModule { }

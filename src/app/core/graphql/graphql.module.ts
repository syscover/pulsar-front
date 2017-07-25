import { NgModule, Inject } from '@angular/core';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { ApolloClientManagerService } from './apollo-client-manager.service';
import { ApolloService } from './apollo.service';

//import { ConfigService } from './../services/config/config.service';

@NgModule({
    imports: [
        //ApolloModule.forRoot(ApolloClientManager.getClient)
        ApolloModule
    ],
    exports: [
        ApolloModule
    ],
    providers: [
        //ConfigService,
        ApolloService,
        ApolloClientManagerService,
    ]
})
export class GraphQLModule { }

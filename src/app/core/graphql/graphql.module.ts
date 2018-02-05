import { NgModule } from '@angular/core';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloModule } from 'apollo-angular';
import { GraphQLService } from './graphql.service';

@NgModule({
    imports: [
        HttpLinkModule,
        ApolloModule
    ],
    exports: [],
    declarations: [],
    providers: [
        GraphQLService
    ],
})
export class GraphqlModule {
    constructor() {}
}

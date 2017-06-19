import { createNetworkInterface } from 'apollo-client';
import { Component, Injector, HostBinding} from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';
import { ApolloClientManager } from './../../core/graphql/apollo-client-manager';
import { ActionService } from './action.service';

import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
const ActionsList = gql`
 {
    actions {
      id
      name
    }
    packages {
      id
      name
      root
      sort
    }
 }
`;

//interface QueryResponse {
    //currentUser
    //loading
//}



@Component({
    selector: 'ps-action-list',
    templateUrl: './action-list.component.html'
})
export class ActionListComponent extends CoreListComponent {

    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected objectService: ActionService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        ApolloClientManager
            .apollo(this.graphqlUri).watchQuery({
                query: ActionsList
            }).subscribe(({data}) => {

                console.log(data);
                //this.loading = data.loading;
                //this.currentUser = data.currentUser;
            });
    }
}

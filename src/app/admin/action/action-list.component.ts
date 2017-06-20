import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { ActionService } from './action.service';

import gql from 'graphql-tag';

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
        protected objectService: ActionService,
    ) {
        super(injector, objectService);
    }

    ngOnInit() {

        // query GraphQL
        /*let queryObjects = gql`
            actions {
                id
                name
            }
        `;
        
        this.apolloService
            .apollo(this.graphqlUri).watchQuery({
                query: queryObjects
            }).subscribe(({data}) => {

                console.log(data);
                //this.loading = data.loading;
                //this.currentUser = data.currentUser;
            });*/
    }
}

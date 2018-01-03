import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { PollGraphQLService } from './poll-graphql.service';

@Component({
    selector: 'ps-poll-list',
    templateUrl: './poll-list.component.html'
})
export class PollListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: PollGraphQLService
    ) {
        super(injector, graphQL);
    }
}

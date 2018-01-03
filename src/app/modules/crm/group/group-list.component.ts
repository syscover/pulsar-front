import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { GroupGraphQLService } from './group-graphql.service';

@Component({
    selector: 'ps-group-list',
    templateUrl: './group-list.component.html'
})
export class GroupListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: GroupGraphQLService
    ) {
        super(injector, graphQL);
    }
}

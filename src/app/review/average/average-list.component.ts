import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { AverageGraphQLService } from './average-graphql.service';

@Component({
    selector: 'ps-average-list',
    templateUrl: './average-list.component.html'
})
export class AverageListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'object_name', 'average'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: AverageGraphQLService
    ) {
        super(injector, graphQL);
    }
}

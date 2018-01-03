import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { ObjectAverageGraphQLService } from './object-average-graphql.service';

@Component({
    selector: 'ps-object-average-list',
    templateUrl: './object-average-list.component.html'
})
export class ObjectAverageListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'object_name', 'average'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: ObjectAverageGraphQLService
    ) {
        super(injector, graphQL);
    }
}

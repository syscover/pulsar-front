import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { ResourceGraphQLService } from './resource-graphql.service';

@Component({
    selector: 'ps-resource-list',
    templateUrl: './resource-list.component.html'
})
export class ResourceListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'name', 'resource.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: ResourceGraphQLService
    ) {
        super(injector, graphQL);
    }
}

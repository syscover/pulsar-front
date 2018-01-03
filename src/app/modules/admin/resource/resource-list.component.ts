import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { ResourceGraphQLService } from './resource-graphql.service';

@Component({
    selector: 'ps-resource-list',
    templateUrl: './resource-list.component.html'
})
export class ResourceListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'admin_resource.id', 'admin_resource.name', 'admin_package.name', 'admin_group.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: ResourceGraphQLService
    ) {
        super(injector, graphQL);
    }
}

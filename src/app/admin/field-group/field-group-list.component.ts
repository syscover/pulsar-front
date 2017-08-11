import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { FieldGroupGraphQLService } from './field-group-graphql.service';

@Component({
    selector: 'ps-field-group-list',
    templateUrl: './field-group-list.component.html'
})
export class FieldGroupListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'admin_field_group.id', 'admin_field_group.name', 'admin_resource.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: FieldGroupGraphQLService
    ) {
        super(injector, graphQL);
    }
}

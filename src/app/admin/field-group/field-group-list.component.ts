import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { FieldGroupGraphQLService } from './field-group-graphql.service';

@Component({
    selector: 'ps-field-group-list',
    templateUrl: './field-group-list.component.html'
})
export class FieldGroupListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'field_group.id', 'field_group.name', 'resource.name'
    ];

    constructor(
        protected injector: Injector,
        protected grahpQL: FieldGroupGraphQLService
    ) {
        super(injector, grahpQL);
    }
}

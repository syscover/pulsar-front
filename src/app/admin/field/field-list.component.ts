import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { FieldGraphQLService } from './field-graphql.service';

@Component({
    selector: 'ps-field-list',
    templateUrl: './field-list.component.html'
})
export class FieldListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'field.id', 'field.name', 'field_group.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: FieldGraphQLService,
    ) {
        super(injector, graphQL);
    }
}

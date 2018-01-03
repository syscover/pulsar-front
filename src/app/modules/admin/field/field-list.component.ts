import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { FieldGraphQLService } from './field-graphql.service';

@Component({
    selector: 'ps-field-list',
    templateUrl: './field-list.component.html'
})
export class FieldListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'admin_field.id', 'admin_field.name', 'admin_field_group.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: FieldGraphQLService,
    ) {
        super(injector, graphQL);
    }
}

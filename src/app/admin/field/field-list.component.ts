import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { FieldGraphQLService } from './field-graphql.service';

@Component({
    selector: 'ps-field-list',
    templateUrl: './field-list.component.html'
})
export class FieldListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: FieldGraphQLService,
    ) {
        super(injector, graphQL);
    }
}

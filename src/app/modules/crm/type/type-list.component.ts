import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { TypeGraphQLService } from './type-graphql.service';

@Component({
    selector: 'ps-type-list',
    templateUrl: './type-list.component.html'
})
export class TypeListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: TypeGraphQLService
    ) {
        super(injector, graphQL);
    }
}

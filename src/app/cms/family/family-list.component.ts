import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { FamilyGraphQLService } from './family-graphql.service';

@Component({
    selector: 'ps-family-list',
    templateUrl: './family-list.component.html'
})
export class FamilyListComponent extends CoreListComponent {

    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: FamilyGraphQLService
    ) {
        super(injector, graphQL);
    }
}

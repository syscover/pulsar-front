import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { LangGraphQLService } from './lang-graphql.service';

@Component({
    selector: 'app-lang-list',
    templateUrl: './lang-list.component.html'
})
export class LangListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: LangGraphQLService
    ) {
        super(injector, graphQL);
    }
}

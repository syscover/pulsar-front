import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { LangGraphQLService } from './lang-graphql.service';

@Component({
    selector: 'app-lang-list',
    templateUrl: './lang-list.component.html'
})
export class LangListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected grahpQL: LangGraphQLService
    ) {
        super(injector, grahpQL);
    }
}

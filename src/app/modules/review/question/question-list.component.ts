import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { QuestionGraphQLService } from './question-graphql.service';

@Component({
    selector: 'ps-question-list',
    templateUrl: './question-list.component.html'
})
export class QuestionListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: QuestionGraphQLService
    ) {
        super(injector, graphQL);
    }
}

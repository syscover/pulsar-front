
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { QuestionGraphQLService } from './question-graphql.service';

@Component({
    selector: 'dh2-review-question-list',
    templateUrl: './question-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class QuestionListComponent extends CoreListComponent
{
    objectTranslation = 'REVIEW.QUESTION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['review_question.id', 'review_question.name'];
    displayedColumns = ['review_question.id', 'review_question.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected injector: Injector,
        public graphQL: QuestionGraphQLService
    ) {
        super(injector, graphQL);
    }
}

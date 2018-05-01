import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { QuestionGraphQLService } from './question-graphql.service';
import { Poll, QuestionType } from './../review.models';

@Component({
    selector: 'dh2-question-detail',
    templateUrl: 'question-detail.component.html',
    animations: fuseAnimations
})
export class QuestionDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'REVIEW.QUESTION';
    objectTranslationGender = 'F';
    polls: Poll[] = [];
    questionTypes: QuestionType[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: QuestionGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            poll_id: [null, Validators.required],
            type_id: [null, Validators.required],
            name: [null, Validators.required],
            description: null,
            sort: null,
            high_score: null
        });
    }

    setRelationsData(data: any) 
    {
        // set review polls
        this.polls = data.reviewPolls;

        // set review question types
        this.questionTypes = data.reviewQuestionTypes;
    }
}


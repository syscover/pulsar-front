import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { Poll, QuestionType } from '../review.models';
import * as _ from 'lodash';
import { graphQL } from './question.graphql';

@Component({
    selector: 'dh2-review-question-detail',
    templateUrl: 'question-detail.component.html',
    animations: fuseAnimations
})
export class QuestionDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'REVIEW.QUESTION';
    objectTranslationGender = 'F';
    polls: Poll[] = [];
    questionTypes: QuestionType[] = [];
    showHighScore = true;

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required],
            poll_id: ['', Validators.required],
            type_id: ['', Validators.required],
            name: ['', Validators.required],
            description: '',
            sort: '',
            high_score: ''
        });
    }

    handleChangePoll($event): void
    {
        if ($event.value) 
        {
            const poll: Poll = <Poll>_.find(this.polls, {id: $event.value});
            if (poll) this.fg.controls['high_score'].setValue(<number>poll.default_high_score);
        }    
    }

    handleChangeType($event): void
    {
        if ($event.value === 1) this.showHighScore = true; else this.showHighScore = false;
    }

    beforePatchValueEdit(): void
    {
        // only for questions with type score and has average
        if (this.dataRoute.action === 'edit' && this.object.average)
        {
            this.fg.addControl('average', this.fb.group({
                id: {value: '', disabled: true},
                reviews: [{value: '', disabled: true}, Validators.required],
                total: [{value: '', disabled: true}, Validators.required],
                average: [{value: '', disabled: true}, Validators.required]
            }));
        }
        
        if (this.object.type_id !== 1) this.showHighScore = false;
    }

    argumentsRelationsObject(): object
    {
        const configQuestionTypes = {
            key: 'pulsar-review.question_types',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            configQuestionTypes
        };
    }

    setRelationsData(data: any): void
    {
        // set review polls
        this.polls = data.reviewPolls;

        // set review question types
        this.questionTypes = data.reviewQuestionTypes;
    }
}


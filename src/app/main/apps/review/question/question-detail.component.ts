import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { QuestionGraphQLService } from './question-graphql.service';
import { Poll, QuestionType } from './../review.models';
import * as _ from 'lodash';

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
    showHighScore = true;

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

    handleChangePoll($event)
    {
        if ($event.value) 
        {
            const poll = _.find(this.polls, {id: $event.value});
            if (poll) this.fg.controls['high_score'].setValue(poll.default_high_score);
        }    
    }

    handleChangeType($event)
    {
        if ($event.value === 1) this.showHighScore = true; else this.showHighScore = false;
    }

    beforePatchValueEdit() 
    {
        // only for questions with type score and has average
        if (this.dataRoute.action === 'edit' && this.object.average)
        {
            this.fg.addControl('average', this.fb.group({
                id: {value: null, disabled: true},
                reviews: [{value: null, disabled: true}, Validators.required],
                total: [{value: null, disabled: true}, Validators.required],
                average: [{value: null, disabled: true}, Validators.required]
            }));
        }
        
        if (this.object.type_id !== 1) this.showHighScore = false;
    }

    argumentsRelationsObject(): Object 
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

    setRelationsData(data: any) 
    {
        // set review polls
        this.polls = data.reviewPolls;

        // set review question types
        this.questionTypes = data.reviewQuestionTypes;
    }
}


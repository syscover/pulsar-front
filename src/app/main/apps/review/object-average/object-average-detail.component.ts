import { Component, Injector } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { Poll, Question } from '../review.models';
import { graphQL } from './object-average.graphql';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-review-object-average-detail',
    templateUrl: 'object-average-detail.component.html',
    animations: fuseAnimations
})
export class ObjectAverageDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'REVIEW.AVERAGE';
    objectTranslationGender = 'F';
    polls: Poll[] = [];
    questions: Question[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            poll_id: [{value: '', disabled: true}],
            object_name: [{value: '', disabled: true}],
            reviews: [{value: '', disabled: true}, Validators.required],
            total: [{value: '', disabled: true}, Validators.required],
            average: [{value: '', disabled: true}, Validators.required],
            fake_average: [{value: '', disabled: true}],
            question_averages: this.fb.array([])
        });
    }

    get questionAverages(): FormArray
    {
        return this.fg.get('question_averages') as FormArray;
    }

    beforePatchValueEdit(): void
    {
        // get all questions from questions averages
        this.questions = this.object.question_averages.map((item) => {
            return item.question;
        });

        // filter questions by baseLang and short
        this.questions = _.sortBy(_.filter(this.questions, obj => {
            return obj.lang_id === this.baseLang;
        }), ['sort']);

        // init question averages formArray structure
        for (const obj of this.questions)
        {
            this.questionAverages.push(this.fb.group({
                id: '',
                poll_id: '',
                question_id: '',
                object_type: '',
                object_id: '',
                reviews: '',
                total: '',
                average: [{value: '', disabled: false}],
                fake_average: ''
            }));
        }
    }

    setRelationsData(data: any): void
    {
        // set review polls
        this.polls = data.reviewPolls;
    }
}


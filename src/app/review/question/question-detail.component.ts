import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { QuestionGraphQLService } from './question-graphql.service';
import { Poll, QuestionType } from './../review.models';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-question-detail',
    templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent extends CoreDetailComponent {

    polls: SelectItem[] = [];
    questionTypes: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: QuestionGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            poll_id: [null, Validators.required],
            type_id: [null, Validators.required],
            name: [null, Validators.required],
            description: null,
            high_score: null
        });
    }

    argumentsRelationsObject(): Object {

        let configQuestionTypes = {
            key: 'pulsar-review.questionTypes',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            configQuestionTypes
        };
    }

    setRelationsData(data: any) {
        // set polls
        this.polls = _.map(<Poll[]>data['reviewPolls'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.polls.unshift({ label: 'Select a poll', value: '' });

         // review question types
         this.questionTypes = _.map(<QuestionType[]>data['reviewQuestionTypes'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.questionTypes.unshift({ label: 'Select a question type', value: '' });
    }
}

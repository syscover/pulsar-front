import { Component, Injector } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
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
            sort: null,
            high_score: null
        });
    }

    beforePatchValueEdit() {
        // only for questions with type score and has average
        if (this.dataRoute.action === 'edit' && this.object['average']) {
            this.fg.addControl('average', this.fb.group({
                id: null,
                reviews: [null, Validators.required],
                total: [null, Validators.required],
                average: [null, Validators.required]
            }));
        }
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

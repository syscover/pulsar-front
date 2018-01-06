import { Question } from '../review.models';
import { Component, Injector } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { ReviewGraphQLService } from './review-graphql.service';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-review-detail',
    templateUrl: './review-detail.component.html'
})
export class ReviewDetailComponent extends CoreDetailComponent {

    public questions: Question[] = [];

    actions: SelectItem[] = [
        { value: '', label: 'Select a action' },
        { value: 1, label: 'Update, validate and add score' },
        { value: 2, label: 'Update, invalidate and subtract score' },
        { value: 3, label: 'Only update review' }
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: ReviewGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            object_name: [{value: null, disabled: true}],
            object_email: [{value: null, disabled: true}],
            customer_name: [{value: null, disabled: true}],
            customer_email: [{value: null, disabled: true}],
            average: [{value: null, disabled: true}],
            completed: [{value: null, disabled: true}],
            validated: [{value: null, disabled: true}],
            action_id: [null, Validators.required],
            responses: this.fb.array([])
        });
    }

    get responses(): FormArray {
        return this.fg.get('responses') as FormArray;
    }

    beforePatchValueEdit() {
        this.questions = _.filter(this.object['poll']['questions'], obj => {
            return obj.lang_id === this.baseLang;
        });

        for (const obj of this.object['responses']) {
            // set formArray estructure
            this.responses.push(this.fb.group({
                id: null,
                question_id: null,
                score: null,
                text: null
            }));
        }
    }

    getCustomArgumentsEditPostRecord(args, object) {

        args['action_id'] = args['object']['action_id'];

        // delete action_id from object to ajust to review class
        delete args['object']['action_id'];

        return args;
    }
}

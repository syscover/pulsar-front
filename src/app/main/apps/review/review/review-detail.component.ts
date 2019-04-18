import { Component, Injector } from '@angular/core';
import { Validators, FormArray } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import * as _ from 'lodash';
import { Question } from '../review.models';
import '@horus/functions/map-order.function';
import { graphQL } from './review.graphql';

@Component({
    selector: 'dh2-review-review-detail',
    templateUrl: 'review-detail.component.html',
    animations: fuseAnimations
})
export class ReviewDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'REVIEW.REVIEW';
    objectTranslationGender = 'F';
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
            object_name: [{value: '', disabled: true}],
            object_email: [{value: '', disabled: true}],
            customer_name: [{value: '', disabled: true}],
            customer_email: [{value: '', disabled: true}],
            average: [{value: '', disabled: true}],
            completed: [{value: '', disabled: true}],
            validated: [{value: '', disabled: true}],
            action_id: ['', Validators.required],
            responses: this.fb.array([])
        });
    }

    beforePatchValueEdit(): void
    {
        // filter questions by baseLang
        this.questions = _.sortBy(_.filter(this.object.poll.questions, obj => {
            return obj.lang_id === this.baseLang.id;
        }), ['sort']);

        // clone object to avoid readonly properties
        this.object = Object.assign({}, this.object);
        
        // assing new responses sort according to the order of the questions
        this.object.responses = this.object.responses.mapOrder('question_id', _.map(this.questions, 'id'));

        // init responses formArray estructure
        for (const obj of this.questions)
        {
            this.responses.push(this.fb.group({
                id: '',
                question_id: '',
                score: '',
                text: ''
            }));
        }
    }

    get responses(): FormArray
    {
        return this.fg.get('responses') as FormArray;
    }

    getCustomArgumentsEditPostRecord(args, object): Array<any>
    {
        args['action_id'] = args['payload']['action_id'];

        // delete action_id from object to ajust to review class
        delete args['payload']['action_id'];

        return args;
    }
}


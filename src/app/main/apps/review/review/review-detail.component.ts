import { Component, Injector } from '@angular/core';
import { Validators, FormArray } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ReviewGraphQLService } from './review-graphql.service';
import * as _ from 'lodash';
import { Question } from './../review.models';
import './../../../core/functions/map-order.function';

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
        protected injector: Injector,
        protected graphQL: ReviewGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
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

    beforePatchValueEdit(): void
    {
        // filter questions by baseLang
        this.questions = _.sortBy(_.filter(this.object.poll.questions, obj => {
            return obj.lang_id === this.baseLang;
        }), ['sort']);

        // clone object to avoid readonly properties
        this.object = Object.assign({}, this.object);
        
        // assing new responses sort according to the order of the questions
        this.object.responses = this.object.responses.mapOrder('question_id', _.map(this.questions, 'id'));

        // init responses formArray estructure
        for (const obj of this.questions)
        {
            this.responses.push(this.fb.group({
                id: null,
                question_id: null,
                score: null,
                text: null
            }));
        }
    }

    get responses(): FormArray
    {
        return this.fg.get('responses') as FormArray;
    }

    getCustomArgumentsEditPostRecord(args, object) 
    {
        args['action_id'] = args['payload']['action_id'];

        // delete action_id from object to ajust to review class
        delete args['payload']['action_id'];

        return args;
    }
}


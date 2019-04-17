import { Component, Injector } from '@angular/core';
import { Validators, FormArray } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import * as _ from 'lodash';
import { Question } from '../review.models';
import '@horus/functions/map-order.function';
import { graphQL } from './comment.graphql';

@Component({
    selector: 'dh2-review-comment-detail',
    templateUrl: 'comment-detail.component.html',
    styleUrls  : ['./comment-detail.component.scss'],
    animations: fuseAnimations
})
export class CommentDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'REVIEW.COMMENT';
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
            review_id: [{value: '', disabled: true}],
            date: [{value: '', disabled: false}],
            // owner_type_id: [{value: '', disabled: true}],
            name: [{value: '', disabled: true}],
            email: [{value: '', disabled: true}],
            comment: ['', Validators.required],
            validated: [{value: '', disabled: true}],
            action_id: ['', Validators.required],
            responses: this.fb.array([])
        });
    }

    beforePatchValueEdit(): void
    {
        // filter questions by baseLang
        this.questions = _.sortBy(_.filter(this.object.review.poll.questions, obj => {
            return obj.lang_id === this.baseLang;
        }), ['sort']);

        // clone object to avoid readonly properties
        this.object = Object.assign({}, this.object);
        
        // assing new responses sort according to the order of the questions
        this.object.responses = this.object.review.responses.mapOrder('question_id', _.map(this.questions, 'id'));

        // init responses formArray estructure
        for (const obj of this.questions)
        {
            this.responses.push(this.fb.group({
                id: {value: '', disabled: true},
                question_id: {value: '', disabled: true},
                score: {value: '', disabled: true},
                text: {value: '', disabled: true}
            }));
        }
    }

    get responses(): FormArray
    {
        return this.fg.get('responses') as FormArray;
    }

    getCustomArgumentsEditPostRecord(args, object): object
    {
        args['action_id'] = args['payload']['action_id'];

        // delete action_id from object to ajust to comment class
        delete args['payload']['action_id'];

        // delete responses from object to ajust to comment class
        delete args['payload']['responses'];

        return args;
    }
}


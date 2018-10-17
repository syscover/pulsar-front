import { Component, Injector } from '@angular/core';
import { Validators, FormArray } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CommentGraphQLService } from './comment-graphql.service';
import * as _ from 'lodash';
import { Question, Response } from './../review.models';
import './../../../core/functions/map-order.function';

@Component({
    selector: 'dh2-comment-detail',
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
        protected injector: Injector,
        protected graphQL: CommentGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            review_id: [{value: null, disabled: true}],
            date: [{value: null, disabled: false}],
            // owner_type_id: [{value: null, disabled: true}],
            name: [{value: null, disabled: true}],
            email: [{value: null, disabled: true}],
            comment: [null, Validators.required],
            validated: [{value: null, disabled: true}],
            action_id: [null, Validators.required],
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
                id: {value: null, disabled: true},
                question_id: {value: null, disabled: true},
                score: {value: null, disabled: true},
                text: {value: null, disabled: true}
            }));
        }
    }

    get responses(): FormArray
    {
        return this.fg.get('responses') as FormArray;
    }

    getCustomArgumentsEditPostRecord(args, object): Object
    {
        args['action_id'] = args['payload']['action_id'];

        // delete action_id from object to ajust to comment class
        delete args['payload']['action_id'];

        // delete responses from object to ajust to comment class
        delete args['payload']['responses'];

        return args;
    }
}


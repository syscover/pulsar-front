import { Component, Injector } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { CommentGraphQLService } from './comment-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { Comment, Question, Response } from './../review.models';
import * as _ from 'lodash';

@Component({
    selector: 'ps-comment-detail',
    templateUrl: './comment-detail.component.html',
    styles: [`
        .conversation .comment-container {
            display: flex;
            flex-direction: row;
        }
        .conversation .comment-container.customer {
        }
        .conversation .comment-container.object {
            justify-content: flex-end;
        }
        .conversation .comment {
            display: inline-block;
            margin: 10px;
            padding: 10px;
            border: 1px solid #bdbdbd;
            border-radius: 5px;
        }
        .conversation .comment .date {
            font-size: 11px;
            font-weight: bold;
        }
    `]
})
export class CommentDetailComponent extends CoreDetailComponent {

    // set empty object, overwritte object to be used in this class
    public object: Comment = new Comment();
    public questions: Question [] = [];
    public responses: Response[] = [];

    actions: SelectItem[] = [
        { value: '', label: 'Select a action' },
        { value: 1, label: 'Update, validate comment and send email' },
        { value: 2, label: 'Update, validate comment' },
        { value: 3, label: 'Update, invalidate comment' }
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: CommentGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            review_id: [{value: null, disabled: true}],
            date: [{value: null, disabled: true}],
            // owner_id: [{value: null, disabled: true}],
            name: [{value: null, disabled: true}],
            email: [{value: null, disabled: true}],
            text: [null, Validators.required],
            validated: [{value: null, disabled: true}],
            action_id: [null, Validators.required]
        });
    }

    beforePatchValueEdit() {
        // create copy object for change readonly properties
        const objectInput = Object.assign({}, this.object);

        // change publish and date format to Date, for calendar component
        objectInput['date'] = new Date(this.object.date);

        // overwrite object with object cloned
        this.object = objectInput;
    }

    setRelationsData(data) {
        // set questions from object, and filter question by base lang
        this.questions = _.filter((<Comment>data['coreObject']).review.poll.questions, obj => {
            return obj.lang_id === this.baseLang;
        });
        this.responses = (<Comment>data['coreObject']).review.responses;
    }

    getCustomArgumentsEditPostRecord(args, object) {

        args['action_id'] = args['object']['action_id'];

        // delete action_id from object to ajust to review class
        delete args['object']['action_id'];

        return args;
    }

    // custom properties
    findResponse(question: number): Response {
        return this.responses.find((response) => {
            return response.question_id === question;
        });
    }
}

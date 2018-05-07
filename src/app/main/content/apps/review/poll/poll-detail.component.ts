import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { PollGraphQLService } from './poll-graphql.service';

@Component({
    selector: 'dh2-poll-detail',
    templateUrl: 'poll-detail.component.html',
    animations: fuseAnimations
})
export class PollDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'REVIEW.POLL';
    objectTranslationGender = 'F';

    constructor(
        protected injector: Injector,
        protected graphQL: PollGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            send_notification: false,
            validate: false,
            default_high_score: null,
            mailing_days: null,
            expiration_days: null,
            review_email_template: null,
            poll_route: null,
            comment_email_template: null,
            comment_email_subject: null
        });
    }
}


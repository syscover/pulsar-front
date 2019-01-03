import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { graphQL } from './poll.graphql';

@Component({
    selector: 'dh2-review-poll-detail',
    templateUrl: 'poll-detail.component.html',
    animations: fuseAnimations
})
export class PollDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'REVIEW.POLL';
    objectTranslationGender = 'F';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required],
            send_notification: false,
            validate: false,
            default_high_score: '',
            mailing_days: '',
            expiration_days: '',
            review_route: '',
            comment_route: '',
            review_email_template: '',
            comment_email_template: ''
        });
    }
}


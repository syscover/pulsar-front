import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { PollGraphQLService } from './poll-graphql.service';

@Component({
    selector: 'ps-poll-detail',
    templateUrl: './poll-detail.component.html'
})
export class PollDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: PollGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required ],
            email_template: null,
            send_notification: null,
            validate: null,
            default_high_score: null,
            mailing_days: null,
            expiration_days: null
        });
    }
}

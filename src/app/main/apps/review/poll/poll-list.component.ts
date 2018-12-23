import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './poll.graphql';

@Component({
    selector: 'dh2-review-poll-list',
    templateUrl: './poll-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class PollListComponent extends CoreListComponent
{
    objectTranslation = 'REVIEW.POLL';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['review_poll.id', 'review_poll.name'];
    displayedColumns = ['review_poll.id', 'review_poll.name', 'review_poll.send_notification', 'review_poll.validate', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

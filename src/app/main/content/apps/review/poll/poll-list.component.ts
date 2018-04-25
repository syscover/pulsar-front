
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { PollGraphQLService } from './poll-graphql.service';

@Component({
    selector: 'dh2-poll-list',
    templateUrl: './poll-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class PollListComponent extends CoreListComponent
{
    objectTranslation = 'REVIEW.POLL';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['review_poll.id', 'review_poll.name'];
    displayedColumns = ['review_poll.id', 'review_poll.name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: PollGraphQLService
    ) {
        super(injector, graphQL);
    }
}

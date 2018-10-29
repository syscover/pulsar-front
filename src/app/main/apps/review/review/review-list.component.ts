
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { ReviewGraphQLService } from './review-graphql.service';

@Component({
    selector: 'dh2-review-list',
    templateUrl: './review-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class ReviewListComponent extends CoreListComponent
{
    objectTranslation = 'REVIEW.REVIEW';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['review_review.id', 'review_review.object_name', 'review_review.object_email', 'review_review.customer_name', 'review_review.customer_email'];
    displayedColumns = ['review_review.id', 'review_review.object_name', 'review_review.object_email', 'review_review.average', 'review_review.validated', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: ReviewGraphQLService
    ) {
        super(injector, graphQL);
    }

    getCustomArgumentsGetRecords(args: Object): Object
    {
        args['sql'].push({
            command: 'orderBy',
            operator: 'desc',
            column: 'review_review.id'
        });

        return args;
    }
}
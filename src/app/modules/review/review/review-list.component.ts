import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { ReviewGraphQLService } from './review-graphql.service';

@Component({
    selector: 'ps-review-list',
    templateUrl: './review-list.component.html'
})
export class ReviewListComponent extends CoreListComponent
{
    columnsSearch: string[] = [
        'id', 'object_name', 'customer_email'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: ReviewGraphQLService
    ) {
        super(injector, graphQL);
    }

    // overwite method to get statuses
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

import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { ReviewGraphQLService } from './review-graphql.service';

@Component({
    selector: 'ps-review-list',
    templateUrl: './review-list.component.html'
})
export class ReviewListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'object_name', 'customer_email', 'average'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: ReviewGraphQLService
    ) {
        super(injector, graphQL);
    }
}

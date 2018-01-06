import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { CommentGraphQLService } from './comment-graphql.service';

@Component({
    selector: 'ps-comment-list',
    templateUrl: './comment-list.component.html'
})
export class CommentListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'id', 'review_id', 'date', 'name', 'email', 'average'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: CommentGraphQLService
    ) {
        super(injector, graphQL);
    }
}

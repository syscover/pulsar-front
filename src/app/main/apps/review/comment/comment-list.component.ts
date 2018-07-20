
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { CommentGraphQLService } from './comment-graphql.service';

@Component({
    selector: 'dh2-comment-list',
    templateUrl: './comment-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class CommentListComponent extends CoreListComponent
{
    objectTranslation = 'REVIEW.COMMENT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['review_comment.id', 'review_comment.review_id', 'review_comment.date', 'review_comment.name', 'review_comment.email'];
    displayedColumns = ['review_comment.id', 'review_comment.name', 'review_comment.email', 'review_comment.validated', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: CommentGraphQLService
    ) {
        super(injector, graphQL);
    }

    getCustomArgumentsGetRecords(args: Object): Object
    {
        args['sql'].push({
            command: 'orderBy',
            operator: 'desc',
            column: 'review_comment.id'
        });

        return args;
    }
}

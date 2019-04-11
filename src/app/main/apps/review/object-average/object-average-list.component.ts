import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './object-average.graphql';

@Component({
    selector: 'dh2-review-object-average-list',
    templateUrl: './object-average-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class ObjectAverageListComponent extends CoreListComponent
{
    objectTranslation = 'REVIEW.POLL';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['review_object_average.id', 'review_object_average.object_name'];
    displayedColumns = ['review_object_average.id', 'review_object_average.object_name', 'review_review.poll.name', 'review_object_average.average', 'review_object_average.fake_average', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}

import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ObjectAverageGraphQLService } from './object-average-graphql.service';
import { Poll } from './../review.models';

@Component({
    selector: 'dh2-review-object-average-detail',
    templateUrl: 'object-average-detail.component.html',
    animations: fuseAnimations
})
export class ObjectAverageDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'REVIEW.AVERAGE';
    objectTranslationGender = 'F';
    polls: Poll[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: ObjectAverageGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            poll_id: [{value: '', disabled: true}],
            object_name: [{value: '', disabled: true}],
            reviews: [{value: '', disabled: true}, Validators.required],
            total: [{value: '', disabled: true}, Validators.required],
            average: [{value: '', disabled: true}, Validators.required]
        });
    }

    setRelationsData(data: any): void
    {
        // set review polls
        this.polls = data.reviewPolls;
    }
}

